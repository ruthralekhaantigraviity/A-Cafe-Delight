/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'cafe-noir': '#1A1A1A',
                'cafe-charcoal': '#2D2D2D',
                'cafe-brown': '#6F4E37',
                'cafe-latte': '#C5A085',
                'cafe-crema': '#F3E5AB',
                'cafe-gold': '#D4AF37',
                'cafe-accent': '#E63946',
            },
            fontFamily: {
                'sans': ['Inter', 'sans-serif'],
                'serif': ['Playfair Display', 'serif'],
            },
            backgroundImage: {
                'hero-pattern': "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2574&auto=format&fit=crop')",
            }
        }
    },
    plugins: [],
}
