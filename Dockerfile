# Use official PHP with Apache
FROM php:8.3-apache

# Enable Apache mod_rewrite (useful for pretty URLs)
RUN a2enmod rewrite

# Install any extensions if needed (like for databases later)
# RUN docker-php-ext-install mysqli pdo_mysql

# Copy your website files
COPY src/ /var/www/html/

# Set permissions
RUN chown -R www-data:www-data /var/www/html