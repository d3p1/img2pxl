/**
 * @description Image fragment shader
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
varying vec4 vColor;

void main() {
    gl_FragColor = vColor;

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}