from django.conf import settings


class CustomSerializerMixin:
    """A custom Mixin class for Serializer."""
    # https://stackoverflow.com/a/35522896

    def to_url(self, image):
        """Convert an ImageField into URL string."""
        image_url = None
        if image and image.url:
            image_path = image.url

            # request = self.context.get("request")
            # image_url = request.build_absolute_uri(image_path)

            # full_domain = 'http://' + request.META['HTTP_HOST']
            # if request.META["SERVER_PORT"] not in full_domain:
            #     full_domain += ':' + request.META["SERVER_PORT"]
            # image_url = full_domain + image_path

            image_url = settings.DOMAIN_URL + image_path
        return image_url
