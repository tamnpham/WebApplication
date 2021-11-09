from django_extensions.db.models import TimeStampedModel


class BaseModel(TimeStampedModel):
    """Base model for apps' models.

    This class adds to models created and modified fields

    """

    class Meta:
        abstract = True
