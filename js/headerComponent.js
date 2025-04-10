     // --------------headerComponent.js
class HeaderComponent extends HTMLElement {
  constructor() {
    super();
     // ---------------Shadow DOM create 
    const shadow = this.attachShadow({ mode: 'open' });
     //--------------- Bootstrap CSS 
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    shadow.appendChild(link);
     //---------------HTML template
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        .divvy-header {
          height: 85px;
          width: calc(100% - 280px);
          background-color: #fff;
          border-bottom: 1px solid #eaecf0;
          position: fixed;
          top: 0;
          left: 280px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          z-index: 999;
        }
        .divvy-header .user-name {
          font-size: 20px;
          font-weight: 600;
          line-height: 30px;
          text-align: left;
          margin: 0;
        }
        .divvy-header .header-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }
      

      </style>
      <div>
      <div
        class="divvy-header d-flex align-items-center justify-content-between"  >
        <div>
          <h1 class="user-name">Hey Admin!</h1>
        </div>

     </div>
     `;
     //---------------Template ko shadow DOM mein attach karein
    shadow.appendChild(template.content.cloneNode(true));
  }
}
     //---------------Custom element define karein
customElements.define('header-component', HeaderComponent);