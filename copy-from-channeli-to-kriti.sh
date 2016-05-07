# Run this to copy paste kriti frontend files from channeli folder to kriti repo

# Switch to channeli branch first in kriti repo
cd kriti
git checkout channeli
cd ..

# Copy index.html
cp -v channeli/templates/kriti/index.html kriti/templates/index.html
# Copy js files
cp -v -R channeli/static/js/kriti/* kriti/static/js/
# Copy libs
cp -v -R channeli/static/js/kriti/libs/* kriti/static/libs/
# Copy sass files
cp -v -R channeli/static/sass/kriti/* kriti/static/sass/
# Copy Angular views
cp -v -R channeli/static/angular_views/kriti/* kriti/static/views/
# Copy images
cp -v -R channeli/static/images/kriti/* kriti/static/images/
