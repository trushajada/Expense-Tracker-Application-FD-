import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Italic, sans-serif;
    }

  h1 {
    text-align: center;
    color: #333;
    margin: 20px 0;
  }

  h3{
    color: #ae6ec5;
    margin: 15px 0;
  }

  form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    height:500px;
    width-height:100%;
    margin: 20px auto;
    padding: 40px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 1px 2px 16px 2px rgba(237,225,237,1);

  }

  input, select {
    margin-bottom: 30px;
    padding: 10px;
    border: 2px solid #aa57c8;
    border-radius: 4px;
  }
  input::placeholder{
  color:#8e29b3
  }
  button {
    padding: 10px;
    background-color: #aa57c8;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      background-color: #8d22b4;
    }
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }

   td {
    border: 3px solid #ae6ec5;
    padding: 8px;
    color: white;
    text-align: center;

  }

  th {
    background-color: #f2f2f2;
    text-align: center;
    border: 3px solid #ae6ec5;
    padding: 8px;
    color: #ae6ec5;

  }
.element {
  color: white;
}

  @media (max-width: 600px) {
    form {
      width: 90%;
    }
  }
`;

export default GlobalStyles;
