import React from "react";
import styled from "styled-components";

const Swit = styled.label`
  --_switch-bg-clr: #f9e6d8; /* Background color of the switch */
  --_switch-padding: 3px; /* Padding around button */
  --_slider-bg-clr: #e7470a; /* Slider color unchecked */

  --_label-padding: 0.8rem 1.8rem; /* Padding around the labels - this gives the switch its global width and height */
  --_switch-easing: cubic-bezier(
    0.47,
    1.64,
    0.41,
    0.8
  ); /* Easing on toggle switch */
  --_font-size: 1.12rem;

  width: fit-content;
  display: flex;
  justify-content: center;
  position: relative;
  border-radius: 10px;
  position: relative;
  isolation: isolate;
  font-size: var(--_font-size);

  input[type="checkbox"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: inherit;
    transition: inset 150ms ease-in-out;
  }

  /* Switch slider */
  &::before {
    background-color: var(--_slider-bg-clr);
    inset: var(--_switch-padding) calc(var(--_switch-padding) + 1%)
      var(--_switch-padding) var(--_switch-padding);
    transition:
      inset 500ms var(--_switch-easing),
      background-color 500ms ease-in-out;
    z-index: -1;
    box-shadow:
      inset 0 1px 1px rgba(0, 0, 0, 0.3),
      0 1px rgba(255, 255, 255, 0.3);
  }

  /* Switch background color */
  &::after {
    background-color: var(--_switch-bg-clr);
    inset: 0;
    z-index: -2;
  }

  > span {
    color: #fff; 
    padding: var(--_label-padding);
    font-weight:bold;
  }

  @media (max-width: 768px) {
    --_label-padding: 0.25rem 1rem;
    --_font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    --_label-padding: 0.1rem 0.5rem;
    --_font-size: 0.75rem;
  }
`;

const Aireviewedimage = ({ onChange }) => (
  <Swit
    style={{ marginTop: "20px" }}
    htmlFor="filte"
    aria-label="Toggle Filte"
  >
    <input type="checkbox" id="" onChange={onChange} />
    <span>AI검토된 계약서</span>
  </Swit>
);

export default Aireviewedimage;

