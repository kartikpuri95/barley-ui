document.addEventListener('DOMContentLoaded', () => {
    // Process all .demo-box elements
    document.querySelectorAll('.demo-box').forEach(demo => {
        const pre = demo.querySelector('pre');
        if (!pre) return;

        const code = pre.querySelector('code');
        if (!code) return;

        const rawHTML = code.textContent;

        // Create tabbed structure
        const tabsContainer = document.createElement('div');
        
        // 1. Tab List
        const tabList = document.createElement('div');
        tabList.className = 'demo-tabs';
        tabList.setAttribute('role', 'tablist');

        const previewTab = document.createElement('button');
        previewTab.className = 'demo-tab active'; // Default active
        previewTab.textContent = '⧉ Preview';
        
        const codeTab = document.createElement('button');
        codeTab.className = 'demo-tab';
        codeTab.textContent = '{} Code';

        tabList.appendChild(previewTab);
        tabList.appendChild(codeTab);

        // 2. Tab Panel: Preview
        const previewPanel = document.createElement('div');
        previewPanel.className = 'demo-preview';
        previewPanel.innerHTML = rawHTML;

        // 3. Tab Panel: Code
        const codePanel = document.createElement('div');
        codePanel.hidden = true; // Default hidden
        
        // Move the original PRE block (with syntax highlighting) into this panel
        pre.style.margin = '0';
        codePanel.appendChild(pre);

        // Tab Switching Logic
        previewTab.addEventListener('click', () => {
            previewTab.classList.add('active');
            codeTab.classList.remove('active');
            previewPanel.hidden = false;
            codePanel.hidden = true;
        });

        codeTab.addEventListener('click', () => {
            codeTab.classList.add('active');
            previewTab.classList.remove('active');
            codePanel.hidden = false;
            previewPanel.hidden = true;
        });

        // Assemble
        tabsContainer.appendChild(tabList);
        tabsContainer.appendChild(previewPanel);
        tabsContainer.appendChild(codePanel);

        // Clear wrapper and append new structure
        demo.innerHTML = '';
        demo.appendChild(tabsContainer);
    });
});
