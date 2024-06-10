
  const vertex_shader = "attribute vec4 a_Position;\n"+
    "void main() {\n"+
    "gl_Position = a_Position;\n"+
    "}\n";

  const fragment_shader = "void main() {\n"+
    "gl_FragColor = vec4(0.54, 0.55, 0.55, 1.0);\n"+
    "}\n";

  console.log(vertex_shader);
  console.log(fragment_shader);

  let canvas = document.getElementById("canvas");
  let gl = canvas.getContext('webgl');


  // check successful initialization of shaders
  if (!initShadersAndProgram(gl, vertex_shader, fragment_shader)) {
    alert('Failed to init shaders');
  }

  let vertexData = [];
  let vertCount = 2;

  for (let i=0.0; i<=360; i+=1) {
    // degrees to radians
    let j = i * Math.PI / 180;
    // X Y Z
    let vert1 = [
      Math.sin(j),
      Math.cos(j),
    ];

    // DONUT:
    let vert2 = [
      Math.sin(j)*0.5,
      Math.cos(j)*0.5,
    ];
    vertexData = vertexData.concat(vert1);
    vertexData = vertexData.concat(vert2);
  }

  let vertices = new Float32Array(vertexData);


  // initialization and attachment of buffers to shaders
  initVertexBuffers(gl, vertices);

  gl.clearColor(0.10, 0.80, 0.20, 0.8);
  gl.clear(gl.COLOR_BUFFER_BIT);

  //start drawing a circle
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexData.length / vertCount);


  // initialization function of shaders
  function initVertexBuffers(gl, vertices) {
    let gl_Buffer = gl.createBuffer();

    if (!gl_Buffer) {
      console.log('Failed to create GL buffer!\n');
      return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, gl_Buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    let gl_Position = gl.getAttribLocation(gl.program, "a_Position");

    gl.vertexAttribPointer(gl_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(gl_Position);
  }


  // Initialization function of shaders
  function initShadersAndProgram(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE) {
    let vertexShader = shaderFactory(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
    let fragmentShader = shaderFactory(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);

    let program = gl.createProgram();
    if(!program) {
      console.log("Failed to create GL program!\n");
      return -1;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    // check link status
    let linked = gl.getProgramParameter(program, gl.LINK_STATUS);

    if (!linked) {
      let error = gl.getProgramInfoLog(program);
      console.log('Failed to link program: ' + error);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return null;
    }

    gl.useProgram(program);
    gl.program = program;

    return true;
  }


  // Factory function for creating shaders
  function shaderFactory(gl, type, shaderCode) {
    let shader = gl.createShader(type);
    if (!shader) {
      console.log("Shader factory failed!\n");
      return -1;
    }
    gl.shaderSource(shader, shaderCode);
    gl.compileShader(shader);

    let isCompiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (!isCompiled) {
      let error = gl.getShaderInfoLog(shader);
      console.log('Failed to compile shader: ' + error);
      return null;
    }

    return shader;
  }
