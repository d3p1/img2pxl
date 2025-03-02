/**
 * @description Image fragment shader
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @todo        Add the possibility of using disc particles instead of squares
 * @todo        Analyze if there is a better way to discard particles without
 *              alpha value
 */
varying vec4 vColor;

void main() {
    if (vColor.a == 0.0) {
        discard;
    }

    gl_FragColor = vColor;
}