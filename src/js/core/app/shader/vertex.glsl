/**
 * @description Image vertex shader
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @todo        Analyze make point size relative to renderer height
 */
uniform sampler2D uImageTexture;
uniform float     uPointSize;

varying vec4 vColor;

void main() {
    vec4 modelPosition      = modelMatrix      * vec4(position, 1.0);
    vec4 viewPosition       = viewMatrix       * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_PointSize = uPointSize;
    gl_Position  = projectionPosition;

    vColor = texture(uImageTexture, uv);
}