# ArtisanHub Website

A modern, responsive website for ArtisanHub - a platform connecting users with trusted local service providers.

## Features

- Responsive design that works on all devices
- Modern UI with animations and transitions
- Interactive components (FAQ accordion, testimonials slider)
- Mobile-friendly navigation
- Newsletter subscription form
- Smooth scrolling navigation
- Optimized performance

## Project Structure

```
artisanhub-web/
├── index.html          # Main HTML file
├── styles/
│   └── main.css       # Main stylesheet
├── js/
│   └── main.js        # JavaScript functionality
├── images/            # Image assets
│   ├── logo.png
│   ├── hero-app.png
│   ├── app-preview.png
│   ├── web-preview.png
│   ├── testimonial1.jpg
│   ├── testimonial2.jpg
│   ├── testimonial3.jpg
│   ├── google-play.png
│   ├── app-store.png
│   └── qr-code.png
└── README.md          # Documentation
```

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/artisanhub-web.git
cd artisanhub-web
```

2. Set up the images:
   - Add your logo image as `images/logo.png`
   - Add app screenshots/mockups as `images/hero-app.png` and `images/app-preview.png`
   - Add web version screenshot as `images/web-preview.png`
   - Add testimonial profile pictures in `images/testimonial*.jpg`
   - Add store badges in `images/google-play.png` and `images/app-store.png`
   - Add QR code image as `images/qr-code.png`

3. Open the website:
   - Double-click `index.html` or
   - Use a local development server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     ```

4. View the website in your browser at `http://localhost:8000`

## Customization

### Colors
The color scheme can be modified in `styles/main.css` by updating the CSS variables in the `:root` selector:

```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --background-color: #f5f6f9;
    --text-color: #333;
    /* ... other variables ... */
}
```

### Content
Update the content in `index.html` to match your specific needs:
- Modify the hero section text and CTAs
- Update feature cards
- Customize service categories
- Add/modify FAQ items
- Update footer links and social media

### Images
Replace the placeholder images in the `images` directory with your own:
- Use optimized images for better performance
- Maintain the same filenames or update the references in HTML
- Recommended formats: PNG for logos and icons, JPEG for photos

## Browser Support

The website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance Optimization

The website implements several optimization techniques:
- Lazy loading of images
- Minified CSS and JavaScript
- Optimized animations using CSS transforms
- Responsive images for different screen sizes
- Efficient event handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - your.email@example.com
Project Link: https://github.com/yourusername/artisanhub-web 