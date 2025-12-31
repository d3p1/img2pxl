/**
 * @description Image fragment shader
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        It is introduced a `discard` logic to avoid issues
 *              on mobile devices where transparent pixels of the border
 *              of the image, are not tested correctly against
 *              the alpha test param and are incorrectly shown
 */
uniform float uAlphaTest;

varying vec4 vColor;

void main() {
    if (vColor.a < uAlphaTest) {
        discard;
    }

    gl_FragColor = vColor;

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}