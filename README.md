<div align=center>

# [IMAGE2PXL]

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Release](https://github.com/d3p1/img2pxl/actions/workflows/release.yml/badge.svg)](https://github.com/d3p1/img2pxl/actions/workflows/release.yml)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

</div>

## Introduction

An efficient image-to-pixel transformation with motion effects, leveraging WebGL's hardware acceleration through [Three.js](https://threejs.org/):

<div align="center">

![Demo](https://raw.githubusercontent.com/d3p1/img2pxl/main/doc/media/demo.gif)

</div>

> [!TIP]
> The approach of this implementation bypasses the performance limitations of the 2D canvas API, enabling smooth and dynamic visual effects directly on the GPU.

> [!TIP]
> If you would like to implement a similar effect on a 3D model, you can use the related library [`d3p1/thr2pxl`](https://github.com/d3p1/thr2pxl), which uses [GPGPU](https://en.wikipedia.org/wiki/General-purpose_computing_on_graphics_processing_units) to achieve it with high performance.

## Installation

You can install this library using a package manager like `npm`:

```javascript
npm install @d3p1/img2pxl
```

Or you can use a CDN like [jsDelivr](https://www.jsdelivr.com/) and this [importmap](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap) in the `<head>` of your `html` file:

```html
<head>
  ...
  <!-- Vanilla -->
  <script type="importmap">
    {
      "imports": {
        "@d3p1/img2pxl": "https://cdn.jsdelivr.net/npm/@d3p1/img2pxl@<version>/dist/img2pxl.min.js",
        "three": "https://cdn.jsdelivr.net/npm/three@<version>/build/three.module.min.js",
        "tweakpane": "https://cdn.jsdelivr.net/npm/tweakpane@<version>/dist/tweakpane.min.js"
      }
    }
  </script>
  ...
</head>
```

```html
<head>
  ...
  <!-- React -->
  <script type="importmap">
    {
      "imports": {
        "@d3p1/img2pxl": "https://cdn.jsdelivr.net/npm/@d3p1/img2pxl@<version>/dist/img2pxl.min.js",
        "react": "https://cdn.jsdelivr.net/npm/react@<version>/jsx-runtime.min.js",
        "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@<version>/index.min.js",
        "three": "https://cdn.jsdelivr.net/npm/three@<version>/build/three.module.min.js",
        "tweakpane": "https://cdn.jsdelivr.net/npm/tweakpane@<version>/dist/tweakpane.min.js"
      }
    }
  </script>
  ...
</head>
```

> [!NOTE]
> Remember to replace the `<version>` with the actual version of `img2pxl` and its peer dependencies ([`three`](https://github.com/mrdoob/three.js) - [`tweakpane`](https://github.com/cocopon/tweakpane) - [`react`](https://github.com/facebook/react) - [`react-dom`](https://github.com/facebook/react)). To do that, you can check the [`package.json`](https://github.com/d3p1/img2pxl/blob/main/package.json) of the last release and get required versions from there.

## Usage

Using this library is straightforward:

1. Go to our [builder page](https://d3p1.github.io/img2pxl/) and make the desired customizations in the tweak panel to achieve the desired effect.

2. Use the `Copy` button to obtain the configuration that produces the desired effect.

3. Instantiate the library with the configuration copied in the previous step, for example:

```javascript
// Vanilla
import {Img2Pxl} from '@d3p1/img2pxl/core'
...
new Img2Pxl({
  images: {
    0: {
      src: <image-src>,
      width: <image-width>,
      height: <image-height>,
      resolution: {
        width: <image-resolution-width>,
        height: <image-resolution-height>
      },
      pixel: {
        size: 2,
        alphaTest: 0.9,
        motion: {
          displacement: {
            frequency: 1,
            amplitude: 40,
          },
        },
      },
      motion: {
        noise: {
          frequency: 0.025,
          amplitude: 40,
        },
      },
    },
  },
  pointer: {
    size: 0.1,
    trailing: {
      factor: 0.01
    }
  }
})
```

```javascript
// React
import {Img2Pxl} from '@d3p1/img2pxl/react'
...
const config = {
  images: {
    0: {
      src: <image-src>,
      width: <image-width>,
      height: <image-height>,
      resolution: {
        width: <image-resolution-width>,
        height: <image-resolution-height>
      },
      pixel: {
        size: 2,
        alphaTest: 0.9,
        motion: {
          displacement: {
            frequency: 1,
            amplitude: 40,
          },
        },
      },
      motion: {
        noise: {
          frequency: 0.025,
          amplitude: 40,
        },
      },
    },
  },
  pointer: {
    size: 0.1,
    trailing: {
      factor: 0.01
    }
  }
}
...
return <Img2Pxl {...config} />
```

> [!NOTE]
> To gain a deeper understanding of how to use this library and how it works under the hood, visit the [wiki page](https://github.com/d3p1/img2pxl/wiki) _(in progress)_.

## Changelog

Detailed changes for each release are documented in [`CHANGELOG.md`](./CHANGELOG.md).

## License

This work is published under [MIT License](./LICENSE).

## Author

Always happy to receive a greeting on:

- [LinkedIn](https://www.linkedin.com/in/cristian-marcelo-de-picciotto/)
- [Web](https://d3p1.dev/)