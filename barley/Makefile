# barley - Build System
# Requires: esbuild (optional)

.PHONY: dist css js clean size

CSS_FILES = src/css/01-theme.css \
            src/css/00-base.css \
            src/css/utilities.css \
            src/css/components/accordion.css \
            src/css/components/alert.css \
            src/css/components/badge.css \
            src/css/components/button.css \
            src/css/components/card.css \
            src/css/components/dialog.css \
            src/css/components/dropdown.css \
            src/css/components/form.css \
            src/css/components/progress.css \
            src/css/components/sidebar.css \
            src/css/components/skeleton.css \
            src/css/components/spinner.css \
            src/css/components/table.css \
            src/css/components/tabs.css \
            src/css/components/toast.css \
            src/css/components/tooltip.css

JS_FILES = src/js/core.js \
           src/js/dropdown.js \
           src/js/sidebar.js \
           src/js/tabs.js \
           src/js/toast.js \
           src/js/tooltip.js

dist: css js size

css:
	@mkdir -p dist
	@cat $(CSS_FILES) > dist/barley.css
	@if command -v esbuild >/dev/null 2>&1; then \
		esbuild dist/barley.css --minify --outfile=dist/barley.min.css; \
	else \
		echo "esbuild not found, skipping css minification"; \
		cp dist/barley.css dist/barley.min.css; \
	fi
	@gzip -9 -k -f dist/barley.min.css
	@echo "CSS Built: dist/barley.min.css"

js:
	@mkdir -p dist
	@cat $(JS_FILES) > dist/barley.js
	@if command -v esbuild >/dev/null 2>&1; then \
		esbuild dist/barley.js --minify --outfile=dist/barley.min.js; \
	else \
		echo "esbuild not found, skipping js minification"; \
		cp dist/barley.js dist/barley.min.js; \
	fi
	@gzip -9 -k -f dist/barley.min.js
	@echo "JS Built: dist/barley.min.js"

clean:
	@rm -rf dist

size:
	@echo ""
	@echo "Bundle Size:"
	@if [ -f dist/barley.min.css ]; then \
		echo "CSS (min):   $$(wc -c < dist/barley.min.css | tr -d ' ') bytes"; \
		echo "CSS (gzip):  $$(wc -c < dist/barley.min.css.gz | tr -d ' ') bytes"; \
	fi
	@if [ -f dist/barley.min.js ]; then \
		echo "JS (min):    $$(wc -c < dist/barley.min.js | tr -d ' ') bytes"; \
		echo "JS (gzip):   $$(wc -c < dist/barley.min.js.gz | tr -d ' ') bytes"; \
	fi
