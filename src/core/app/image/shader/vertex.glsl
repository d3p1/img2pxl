/**
 * @description Image vertex shader
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
uniform sampler2D uImageTexture;
uniform float     uPointSize;

varying vec4 vColor;

void main() {
    vec3 vertexPosition = position;

    vec4 modelPosition      = modelMatrix      * vec4(vertexPosition, 1.0);
    vec4 viewPosition       = viewMatrix       * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position  = projectionPosition;
    gl_PointSize = uPointSize;

    vColor = texture(uImageTexture, uv);
}