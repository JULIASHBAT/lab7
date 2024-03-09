function Thumbnail({ image, selected, onSelect }) {
  return (
    <div
      className={"thumbnail" + (selected ? " active" : "")}
      onClick={() => onSelect(image)}
    >
      <img src={image.download_url} alt="Thumbnail" />
    </div>
  );
}

function MainController() {
  const [images, setImages] = React.useState([]);
  const [selectedImage, setSelectedImage] = React.useState(null);

  React.useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    const url = `https://picsum.photos/v2/list?limit=20`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setImages(data);
        setSelectedImage(data[0]);
      });
  };

  const selectImage = (image) => {
    setSelectedImage(image);
    scrollToActiveThumbnail();
  };

  const prevImage = () => {
    const index = images.indexOf(selectedImage);
    if (index > 0) {
      setSelectedImage(images[index - 1]);
      scrollToActiveThumbnail();
    }
  };

  const nextImage = () => {
    const index = images.indexOf(selectedImage);
    if (index < images.length - 1) {
      setSelectedImage(images[index + 1]);
      scrollToActiveThumbnail();
    }
  };

  const scrollToActiveThumbnail = () => {
    setTimeout(() => {
      const container = document.getElementById("thumbnailContainer");
      const activeThumbnail = container.querySelector(".thumbnail.active");
      if (activeThumbnail) {
        const containerRect = container.getBoundingClientRect();
        const activeRect = activeThumbnail.getBoundingClientRect();
        if (
          activeRect.left < containerRect.left ||
          activeRect.right > containerRect.right
        ) {
          container.scrollLeft +=
            activeRect.left -
            containerRect.left -
            container.clientWidth / 2 +
            activeRect.width / 2;
        }
      }
    }, 0);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <div className="navigation-icon" onClick={prevImage}>
          &lt;
        </div>
        <div className="thumbnail-container" id="thumbnailContainer">
          {images.map((image) => (
            <Thumbnail
              key={image.id}
              image={image}
              selected={image.id === selectedImage.id}
              onSelect={selectImage}
            />
          ))}
        </div>
        <div className="navigation-icon" onClick={nextImage}>
          &gt;
        </div>
      </div>
      <div className="text-center">
        <img
          src={selectedImage && selectedImage.download_url}
          className="main-image img-thumbnail mb-3"
          alt="Selected Image"
        />
      </div>
    </div>
  );
}

ReactDOM.render(<MainController />, document.getElementById("root"));
