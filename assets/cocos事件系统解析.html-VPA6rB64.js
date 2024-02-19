import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as a,c as s,e}from"./app-cqkqrCe_.js";const i={},c=e(`<h2 id="事件的工具类" tabindex="-1"><a class="header-anchor" href="#事件的工具类"><span>事件的工具类</span></a></h2><ol><li>回调函数的封装</li></ol><p>主要是作用是处理函数和this之间的关系，防止this的错误绑定。</p><p>路径 ：engine-v3.8.2\\cocos\\core\\event\\callbacks-invoker.ts</p><h2 id="全局事件系统" tabindex="-1"><a class="header-anchor" href="#全局事件系统"><span>全局事件系统</span></a></h2><div class="language-mermaid line-numbers-mode" data-ext="mermaid" data-title="mermaid"><pre class="language-mermaid"><code><span class="token keyword">classDiagram</span>
    <span class="token keyword">class</span> BankAccount<span class="token punctuation">{</span>
        +String owner
        -BigDecimal balance *
        #deposit<span class="token text string">(amount)</span> 
        ~withdrawal<span class="token text string">(amount)</span> $
    <span class="token punctuation">}</span>
    <span class="token keyword">class</span> A<span class="token punctuation">{</span>

    <span class="token punctuation">}</span>

    A<span class="token arrow operator">*--</span>BankAccount

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="节点事件系统" tabindex="-1"><a class="header-anchor" href="#节点事件系统"><span>节点事件系统</span></a></h2>`,7),l=[c];function t(d,r){return a(),s("div",null,l)}const m=n(i,[["render",t],["__file","cocos事件系统解析.html.vue"]]);export{m as default};
