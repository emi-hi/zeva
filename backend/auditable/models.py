from django.db import models

from db_comments.model_mixins import DBComments


class Auditable(models.Model, DBComments):
    """
    Parent model class to provide timestamps and users involved
    in creating and updating the model
    """
    create_timestamp = models.DateTimeField(
        auto_now_add=True, blank=True, null=True,
        db_comment='Creation timestamp'
    )
    create_user = models.ForeignKey(
        'UserProfile',
        related_name='%(app_label)s_%(class)s_CREATE_USER',
        blank=True, null=True,
        on_delete=models.CASCADE,
        db_comment='creating user'
    )
    update_timestamp = models.DateTimeField(
        auto_now=True, blank=True, null=True,
        db_comment='Last updated/saved timestamp'
    )
    update_user = models.ForeignKey(
        'UserProfile',
        related_name='%(app_label)s_%(class)s_UPDATE_USER',
        blank=True, null=True,
        on_delete=models.CASCADE,
        db_comment='last updating user'
    )

    # Supplemental mapping for base class
    db_column_supplemental_comments = {
        'id': 'Primary key'
    }

    class Meta:
        abstract = True


class Commentable(models.Model, DBComments):
    """
    Parent model class to just add the comments.
    The Auditable class contains timestamp fields, this one is blank.
    """
    class Meta:
        abstract = True
