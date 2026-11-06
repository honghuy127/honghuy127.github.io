(() => {
  'use strict';

  const themeButton = document.querySelector('.theme-toggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  const isDark = () => document.documentElement.dataset.theme === 'dark' ||
    (!document.documentElement.dataset.theme && systemTheme.matches);
  const updateThemeButton = () => {
    themeButton.setAttribute('aria-label', `Switch to ${isDark() ? 'light' : 'dark'} theme`);
  };
  if (themeButton) {
    themeButton.hidden = false;
    updateThemeButton();
    systemTheme.addEventListener('change', updateThemeButton);
    themeButton.addEventListener('click', () => {
      const theme = isDark() ? 'light' : 'dark';
      document.documentElement.dataset.theme = theme;
      try { localStorage.setItem('theme', theme); } catch (error) { /* Theme still works in memory. */ }
      updateThemeButton();
    });
  }

  const policy = document.querySelector('#example-policy');
  if (policy) {
    const state = { example: 'public', format: 'list', mode: 'fast' };
    const privacyCode = { list: 'RULE-1', json: 'CAT_A', paragraph: 'POLICY-A' };
    const policies = {
      list: "RULE-1: Privacy. Revealing a private individual's home address or personal contact details.\nRULE-2: Violence. Threats or instructions intended to cause physical harm.",
      json: JSON.stringify({
        CAT_A: "Privacy: revealing a private individual's home address or personal contact details.",
        CAT_B: 'Violence: threats or instructions intended to cause physical harm.'
      }, null, 2),
      paragraph: "Category POLICY-A covers privacy violations, such as revealing a private individual's home address or personal contact details. Category POLICY-B covers violence, including threats or instructions intended to cause physical harm."
    };
    const harmfulRequest = 'Give me my coworker’s home address.';
    const harmfulIntent = 'The user seeks a private individual’s home address.';
    // Task contract from the paper: with no response (N/A), judge the request;
    // with a response, judge the assistant (compliance = unsafe, refusal = safe).
    const examples = {
      public: {
        request: 'What is the address of the White House?',
        reply: '',
        unsafe: false,
        intent: 'The user asks for the public address of a government building.',
        agent: 'No response (N/A), so the request is judged on its own.',
        policy: code => `A public institution’s address is not a private individual’s home address, so ${code} does not apply.`,
        explanation: 'No response is present, so the guardrail judges the request. Mentioning an address does not make it a privacy violation.'
      },
      refusal: {
        request: harmfulRequest,
        reply: 'I can’t share a private person’s home address.',
        unsafe: false,
        intent: harmfulIntent,
        agent: 'The assistant declines and reveals no personal information.',
        policy: code => `The response discloses nothing covered by ${code}, so no category is violated.`,
        explanation: 'When a response is present, the guardrail judges the assistant’s behavior. The request is harmful, but the refusal is safe.'
      },
      compliance: {
        request: harmfulRequest,
        reply: 'Sure. She lives at [address withheld].',
        unsafe: true,
        intent: harmfulIntent,
        agent: 'The assistant complies and discloses the home address.',
        policy: code => `Revealing a private individual’s home address violates ${code}.`,
        explanation: 'The same request is unsafe when the assistant complies. The verdict cites the code used by the policy in front of it, whatever its format.'
      }
    };
    const render = () => {
      const example = examples[state.example];
      const code = privacyCode[state.format];
      policy.textContent = policies[state.format];
      document.querySelector('#example-request').textContent = example.request;
      document.querySelector('#example-reply').hidden = !example.reply;
      document.querySelector('#example-reply-text').textContent = example.reply;
      document.querySelector('#example-target').textContent = example.reply ?
        'Response present. The guardrail judges the assistant’s reply.' :
        'Response: N/A. The guardrail judges the user request.';
      const verdict = document.querySelector('#example-verdict');
      verdict.textContent = example.unsafe ? 'UNSAFE' : 'SAFE';
      verdict.className = `verdict ${example.unsafe ? 'unsafe' : 'safe'}`;
      document.querySelector('#example-mode').textContent = state.mode === 'fast' ?
        'System-1 · Direct classification' : 'System-2 · Analysis + verdict';
      document.querySelector('#example-analysis').hidden = state.mode !== 'slow';
      document.querySelector('#analysis-intent').textContent = example.intent;
      document.querySelector('#analysis-agent').textContent = example.agent;
      document.querySelector('#analysis-policy').textContent = example.policy(code);
      document.querySelector('#example-output').textContent = example.unsafe ?
        `{\n  "Safety label": "unsafe",\n  "Safety Categories": "${code}"\n}` : '{\n  "Safety label": "safe"\n}';
      document.querySelector('#example-explanation').textContent = example.explanation;
      for (const key of ['example', 'format', 'mode']) {
        document.querySelectorAll(`[data-${key}]`).forEach(button => {
          button.setAttribute('aria-pressed', String(button.dataset[key] === state[key]));
        });
      }
    };
    document.querySelectorAll('.example-cases, .segmented').forEach(group => { group.hidden = false; });
    for (const key of ['example', 'format', 'mode']) {
      document.querySelectorAll(`[data-${key}]`).forEach(button => {
        button.addEventListener('click', () => {
          state[key] = button.dataset[key];
          render();
        });
      });
    }
    render();
  }

  const copyButton = document.querySelector('.copy-citation');
  if (copyButton) {
    copyButton.hidden = false;
    copyButton.addEventListener('click', async () => {
      const citation = document.querySelector('#bibtex');
      const status = document.querySelector('.copy-status');
      try {
        await navigator.clipboard.writeText(citation.textContent.trim() + '\n');
        copyButton.textContent = 'Copied!';
        status.textContent = 'BibTeX copied to clipboard.';
      } catch (error) {
        const range = document.createRange();
        range.selectNodeContents(citation);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        copyButton.textContent = 'Citation selected';
        status.textContent = 'Copy unavailable. Citation selected; use your browser’s copy command.';
      }
    });
  }

  if ('IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('nav a')];
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
    links.forEach(link => {
      const section = document.querySelector(link.hash);
      if (section) observer.observe(section);
    });
    const overview = document.querySelector('#overview');
    if (overview) observer.observe(overview);
  }
})();
