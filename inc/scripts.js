angular
  .module("AngularJSApp", [])
  .controller("MainController", function ($scope, $http) {
    $scope.images = [];
    $scope.selectedImage = null;

    $scope.fetchImages = function () {
      const url = `https://picsum.photos/v2/list?limit=20`; // Adjust the limit as needed
      $http.get(url).then(function (response) {
        $scope.images = response.data;
        $scope.selectedImage = $scope.images[0]; // Select the first image by default
      });
    };

    $scope.selectImage = function (image) {
      $scope.selectedImage = image;
      $scope.scrollToActiveThumbnail();
    };

    $scope.prevImage = function () {
      let index = $scope.images.indexOf($scope.selectedImage);
      if (index > 0) {
        $scope.selectedImage = $scope.images[index - 1];
        $scope.scrollToActiveThumbnail();
      }
    };

    $scope.nextImage = function () {
      let index = $scope.images.indexOf($scope.selectedImage);
      if (index < $scope.images.length - 1) {
        $scope.selectedImage = $scope.images[index + 1];
        $scope.scrollToActiveThumbnail();
      }
    };

    $scope.scrollToActiveThumbnail = function () {
      setTimeout(function () {
        const container = document.getElementById("thumbnailContainer");
        const activeThumbnail =
          container.querySelector(".thumbnail.active");
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

    $scope.fetchImages();
  });