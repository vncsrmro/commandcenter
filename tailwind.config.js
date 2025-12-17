/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "var(--bg-background)", // Mapping to our new variables
                foreground: "var(--text-primary)",
                primary: {
                    DEFAULT: "var(--accent-blue)",
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "var(--bg-surface)",
                    foreground: "var(--text-secondary)",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "var(--bg-surface-hover)",
                    foreground: "var(--text-muted)",
                },
                accent: {
                    DEFAULT: "var(--bg-surface-hover)",
                    foreground: "var(--text-primary)",
                },
                popover: {
                    DEFAULT: "var(--glass-bg)",
                    foreground: "var(--text-primary)",
                },
                card: {
                    DEFAULT: "var(--bg-surface)",
                    foreground: "var(--text-primary)",
                },
            },
            borderRadius: {
                lg: "var(--radius-card)",
                md: "calc(var(--radius-btn) - 2px)",
                sm: "calc(var(--radius-btn) - 4px)",
            },
        },
    },
    plugins: [],
}
