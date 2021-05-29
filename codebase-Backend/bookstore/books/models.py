from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _


class Address(models.Model):
    street_address = models.CharField('', max_length=255, blank=False, null=False)
    address_line_2 = models.CharField('', max_length=255, blank=True, null=True)
    city = models.CharField('', max_length=255, blank=False, null=False)
    state = models.CharField('', max_length=255, blank=False, null=False)
    zip_code = models.IntegerField('', blank=False, null=False)


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.IntegerField('', null=False, blank=False, unique=True)
    addresses = models.ManyToManyField(Address)


class Authors(models.Model):
    class Sex(models.TextChoices):
        MALE = 'M', _('Male')
        FEMALE = 'F', _('Female')
        OTHERS = 'O', _('Others')

    first_name = models.CharField('', max_length=255, blank=False, null=False)
    last_name = models.CharField('', max_length=255, blank=False, null=False)
    sex = models.CharField('', max_length=1, choices=Sex.choices, blank=False, null=False)
    dob = models.DateTimeField('', blank=True, null=True)
    photo = models.ImageField(upload_to='images/', default='images/None')
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='Created By +')
    last_modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='Last modified by +')
    created_at = models.DateTimeField('', auto_now_add=True)
    last_modified_at = models.DateTimeField('', auto_now=True)

    class Meta:
        unique_together = ('first_name', "last_name")


class Publishers(models.Model):
    name = models.CharField('', max_length=255, unique= True)
    phone_number = models.IntegerField('')
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='Created By +')
    last_modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='Last modified by +')
    created_at = models.DateTimeField('', auto_now_add=True)
    last_modified_at = models.DateTimeField('', auto_now=True)


class Books(models.Model):
    ISBN = models.CharField('', max_length=255, unique=True)
    title = models.CharField('', max_length=255, blank=False, null=False)
    price = models.FloatField('', blank=False, null=False)
    authors = models.ManyToManyField(Authors)
    image = models.ImageField(upload_to='images/', default='images/None')
    publisher = models.ForeignKey(Publishers, on_delete=models.CASCADE)
    stock = models.IntegerField('', default=0)
    sold = models.IntegerField('', default=0)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='Created By +')
    last_modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='Last modified by +')
    created_at = models.DateTimeField('', auto_now_add=True)
    last_modified_at = models.DateTimeField('', auto_now=True)


class Cart(models.Model):
    book = models.ForeignKey(Books, on_delete=models.SET_NULL, null=True, related_name='book')
    count = models.IntegerField('')
    price = models.IntegerField('')


class Order(models.Model):
    class Status(models.TextChoices):
        RECEIVED = 'REC', _('Received')
        PROCESSING = 'PRO', _('Processing')
        SHIPPED = 'SHI', _('Shipped')
        DELIVERED = 'DEL', _('Delivered')
        CANCELLED = 'CAN', _('Cancelled')

    books = models.ManyToManyField(Cart)
    amount = models.IntegerField('')
    address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    status = models.CharField('', max_length=3, choices=Status.choices, blank=False, null=False, default='REC')
    date = models.DateTimeField('', auto_now=True)
