# Run this to copy paste new files from kriti repo to channeli folder

# Copy index.html
cp -v kriti/templates/index.html channeli/templates/kriti/
# Copy js files
cp -v -R kriti/static/js/* channeli/static/js/kriti/
# Copy libs
cp -v -R kriti/static/libs/* channeli/static/js/kriti/libs/
# Copy sass files
cp -v -R kriti/static/sass/* channeli/static/sass/kriti/
# Copy Angular views
cp -v -R kriti/static/views/* channeli/static/angular_views/kriti/
#Copy images
cp -v -R kriti/static/images/* channeli/static/images/kriti/
