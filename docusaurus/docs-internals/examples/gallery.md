# Gallery Element

The example below shows how to build a gallery element (a simple form of this) like a third-party element using the "@brizy/cloud-media-upload" library and the "addable" option.

The complete source code for this example can be found [here](https://github.com/EasyBrizy/Brizy-Local-Editor/tree/master/packages/demo-nextjs/src/widgets/Gallery).

<video width="100%" controls>
  <source src="/video/examples/gallery/gallery-showcase.mp4" type="video/mp4" />
  Your browser does not support the video tag. Please download the video: 
  <a href="/video/examples/gallery/gallery-showcase.mp4">Download</a>.
</video>

#### Define the Component structure

Below is the structure of the root of the gallery component. You can see other components used in the [example](https://github.com/EasyBrizy/Brizy-Local-Editor/tree/master/packages/demo-nextjs/src/widgets/Gallery).
This part contains the logic for retrieving all images from the element model using the ImageUtility class, as well as the rendering logic for the items.

```tsx showLineNumbers
import { ImageUtility } from "@brizy/core";
// import ...

export default function Gallery(props: GalleryProps) {
  const { galleryItems } = props;
  const imgUtils = useRef<ImageUtility>(new ImageUtility());

  const images = useMemo(
    (): Array<Partial<Image>> =>
      galleryItems.map(({ id }) => {
        const imageKey = `galleryItems${Capitalize(id)}Img`;
        const imageData = imgUtils.current.getImageData({ id: imageKey, v: props });
        const imageTitleKey = `galleryItems${Capitalize(id)}Title`;

        return { src: imageData.src, title: props[imageTitleKey] as string };
      }),

    [galleryItems, imgUtils, props],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const hasImages = images.length > 0;

  return (
    <div className="gallery">
      {hasImages ? (
        <>
          <BigImage image={images[activeIndex]} />
          <Items images={images} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
}
```

:::info
You can import and use the ImageUtility class from the [@brizy/core](https://www.npmjs.com/package/@brizy/core) package to retrieve all related image data (such as src, width, height, etc.) based on their IDs from the element model.
:::

#### Define the toolbar structure

```tsx showLineNumber
export default function getToolbar({ t }: ToolbarGetter): ToolbarConfig[] {
  return [
    {
      selector: ".gallery",
      toolbar: [
        {
          id: "toolbarCurrentElement",
          type: "popover",
          config: {
            icon: "nc-woo-gallery",
            title: "Gallery",
          },
          // Only for desktop devices
          devices: "desktop",
          position: 90,
          options: [
            {
              id: "galleryItems",
              type: "addable",
              config: {
                title: "Images",
                showCount: true,
              },
              shape: [
                {
                  id: "title",
                  label: t("ImageTitle"),
                  type: "inputText",
                },
                {
                  id: "img",
                  type: "imageUpload",
                  config: {
                    pointer: false,
                    disableSizes: true,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ];
}
```

:::info
If you want your element to contain multiple items with the same structure, you can use the addable option. For more details, see the [Addable section](/docs-internals/editor-controls/data-controls/addable).
:::

#### Write the export logic

Since the preview is rendered as fully compiled HTML (without React), we need to implement the component logic manually in [this file](https://github.com/EasyBrizy/Brizy-Local-Editor/blob/master/packages/demo-nextjs/src/widgets/Gallery/export.ts).
Here, we make the markup interactive and ensure it behaves as intended.

```tsx showLineNumber
document.addEventListener("DOMContentLoaded", () => {
  const galleries = document.querySelectorAll(".gallery");
  for (const gallery of galleries) {
    initGallery(gallery);
  }
});

function initGallery(gallery: Element) {
  const images = gallery.querySelectorAll(".gallery__all-images .item");
  const bigImage = gallery.querySelector<HTMLImageElement>(".gallery__big-image img");

  gallery.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const image = target.closest(".item");
    if (!image) return;

    // set Active item
    images.forEach((image) => {
      image.classList.remove("active");
    });
    image.classList.add("active");

    // set Big image source
    if (bigImage) {
      const _src = image.querySelector("img")?.getAttribute("src");
      bigImage.src = _src ?? "";
    }
  });
}
```

#### Register Component in Editor

```tsx
Brizy.registerComponent({
  id: "Brizy.ThirdParty.Gallery",
  component: {
    editor: Editor,
    view: View,
  },
  title: "Gallery2",
  icon: "nc-woo-gallery",
  category: "custom",
  options: getToolbar,
});
```
