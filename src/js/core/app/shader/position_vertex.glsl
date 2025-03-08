vec3 vertexPosition = position;

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