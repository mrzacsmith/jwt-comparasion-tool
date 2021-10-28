import React from "react";
import hmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";
import "./styles.css";

const header = {
  alg: "HS256",
  typ: "JWT"
};

const payload1 = {
  sub: "1234567890",
  name: "John Doe",
  iat: 1516239022
};

const payload2 = {
  sub: "1234567890",
  name: "John Doe",
  iat: 1516239022
};

const jwtSecret1 = "secret123";
const jwtSecret2 = "secret123";

const encodingReplacements = {
  "+": "-",
  "/": "-",
  "=": ""
};

const makeUrlSafe = (encoded) => {
  return encoded.replace(/[+/=]/g, (match) => encodingReplacements[match]);
};

const encode = (obj) => {
  const encoded = btoa(JSON.stringify(obj));
  return encoded;
};

const makeSignature = (header, payload, secret) => {
  const hashed = hmacSHA256(
    `${encode(header)}.${makeUrlSafe(encode(payload))}`,
    secret
  );
  const stringified = Base64.stringify(hashed);
  return makeUrlSafe(stringified);
};

const getJwt = (header, payload, signature) => {
  return `${header}.${payload}.${signature}`;
};

const App = () => {
  return (
    <div className="App">
      <p>header</p>
      <pre>
        <code>{encode(header)}</code>
      </pre>
      <p>payload</p>
      <pre>
        <code>
          <span>1.</span> {makeUrlSafe(encode(payload1))}
        </code>
      </pre>
      <pre>
        <code>
          <span>2.</span> {makeUrlSafe(encode(payload2))}
        </code>
      </pre>
      <p> signature</p>
      <pre>
        <code>
          <span>1.</span> {makeSignature(header, payload1, jwtSecret1)}
        </code>
      </pre>
      <pre>
        <code>
          <span>2.</span> {makeSignature(header, payload2, jwtSecret2)}
        </code>
      </pre>
      <p>jwt token</p>
      <pre>
        <code>
          <span>1.</span>{" "}
          {getJwt(
            encode(header),
            makeUrlSafe(encode(payload1)),
            makeSignature(header, payload1, jwtSecret1)
          )}
        </code>
      </pre>
      <pre>
        <code>
          <span>2.</span>{" "}
          {getJwt(
            encode(header),
            makeUrlSafe(encode(payload1)),
            makeSignature(header, payload1, jwtSecret1)
          )}
        </code>
      </pre>
    </div>
  );
};

export default App;
