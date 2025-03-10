/**
 * @description Shader chunk used to handle vertex/point/pixel displacement
 *              to handle vertex/point/pixel displacement
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
vec3 vertexPosition = position;

vec2  noiseUv            = vec2(uv.x - uNoiseFrequency * uTime, uv.y);
float noiseFactor        = texture(uNoiseTexture, noiseUv).r * uNoiseAmplitude;
float noiseX             = cos(aDisAngle) * noiseFactor;
float noiseY             = sin(aDisAngle) * noiseFactor;
vec2  noise              = vec2(noiseX, noiseY);
      vertexPosition.xy += noise;

float disFactor  = texture(uDisTexture, uv).r;
      disFactor  = smoothstep(0.2, 0.8, disFactor);
      disFactor  = (sin(uDisFrequency * uTime) + 1.5) / (2.5) *
                   disFactor                                  *
                   uDisAmplitude;
      disFactor *= aDisAmplitude;

float displacementX      = cos(aDisAngle) * disFactor;
float displacementY      = sin(aDisAngle) * disFactor;
vec2  displacement       = vec2(displacementX, displacementY);
      vertexPosition.xy += displacement;