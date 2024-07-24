import React from 'react';
import styled from 'styled-components';

const Switch = styled.label`
  --_switch-bg-clr: #f9e6d8; /* Background color of the switch */
  --_switch-padding: 4px; /* Padding around button */
  --_slider-bg-clr: #E7470A; /* Slider color unchecked */
  --_slider-bg-clr-on: #e95725; /* Slider color checked */
  --_slider-txt-clr: #ffffff;
  --_inactive-txt-clr: #888888; /* Inactive text color */
  --_label-padding: 0.5rem 1.5rem; /* Padding around the labels - this gives the switch its global width and height */
  --_switch-easing: cubic-bezier(0.47, 1.64, 0.41, 0.8); /* Easing on toggle switch */
  --_font-size: 1.13rem;

  width: fit-content;
  display: flex;
  justify-content: center;
  position: relative;
  border-radius: 9999px;
  cursor: pointer;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  position: relative;
  isolation: isolate;
  font-size: var(--_font-size);

  input[type='checkbox'] {
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

  > span {
    display: grid;
    place-content: center;
    transition: opacity 300ms ease-in-out 150ms, color 300ms ease-in-out 150ms;
    padding: var(--_label-padding);
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: inherit;
    transition: inset 150ms ease-in-out;
  }

  /* Switch slider */
  &::before {
    background-color: var(--_slider-bg-clr);
    inset: var(--_switch-padding) 50% var(--_switch-padding) var(--_switch-padding);
    transition: inset 500ms var(--_switch-easing),
      background-color 500ms ease-in-out;
    z-index: -1;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.3);
  }

  /* Switch background color */
  &::after {
    background-color: var(--_switch-bg-clr);
    inset: 0;
    z-index: -2;
  }

  /* Switch hover */
  &:hover::after {
    inset: -0.25rem;
  }

  /* Checked - move slider to right */
  &:has(input:checked)::before {
    background-color: var(--_slider-bg-clr-on);
    inset: var(--_switch-padding) var(--_switch-padding) var(--_switch-padding) 50%;
  }

  /* Checked - set opacity */
  > span:last-of-type,
  > input:checked + span:first-of-type {
    opacity: 0.5;
    color: var(--_inactive-txt-clr); /* Inactive text color */
  }
  > input:checked ~ span:last-of-type {
    opacity: 1;
    color: initial; /* Active text color */
  }
  > span:first-of-type {
    color: initial;
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

const Toggleswitch = ({ onChange }) => (
  <Switch htmlFor="filter" aria-label="Toggle Filter">
    <input type="checkbox" id="filter" onChange={onChange} />
    <span>주요조항</span>
    <span>주의조항</span>
  </Switch>
);

export default Toggleswitch;
