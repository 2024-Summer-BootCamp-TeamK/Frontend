import React from 'react';
import styled from 'styled-components';

const Switch = styled.label`
  --_switch-bg-clr: #70a9c5;
  --_switch-padding: 4px; /* padding around button*/
  --_slider-bg-clr: rgba(12, 74, 110, 0.65); /* slider color unchecked */
  --_slider-bg-clr-on: rgba(12, 74, 110, 1); /* slider color checked */
  --_slider-txt-clr: #ffffff;
  --_label-padding: 1rem 2rem; /* padding around the labels -  this gives the switch its global width and height */
  --_switch-easing: cubic-bezier(
    0.47,
    1.64,
    0.41,
    0.8
  ); /* easing on toggle switch */

  width: fit-content;
  display: flex;
  justify-content: center;
  position: relative;
  border-radius: 30px;
  cursor: pointer;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  position: relative;
  isolation: isolate;

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
    transition: opacity 300ms ease-in-out 150ms;
    padding: var(--_label-padding);
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: inherit;
    transition: inset 150ms ease-in-out;
  }

  /* switch slider */
  &::before {
    background-color: var(--_slider-bg-clr);
    inset: var(--_switch-padding) 50% var(--_switch-padding)
      var(--_switch-padding);
    transition: inset 500ms var(--_switch-easing),
      background-color 500ms ease-in-out;
    z-index: -1;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.3);
  }

  /* switch bg color */
  &::after {
    background-color: var(--_switch-bg-clr);
    inset: 0;
    z-index: -2;
  }

  /* switch hover */
  &:hover::after {
    inset: -0.25rem;
  }

  /* checked - move slider to right */
  &:has(input:checked)::before {
    background-color: var(--_slider-bg-clr-on);
    inset: var(--_switch-padding) var(--_switch-padding) var(--_switch-padding)
      50%;
  }

  /* checked - set opacity */
  > span:last-of-type,
  > input:checked + span:first-of-type {
    opacity: 0.5;
  }
  > input:checked ~ span:last-of-type {
    opacity: 1;
  }
`;

const Toggleswitch = () => (
  <Switch htmlFor="filter" aria-label="Toggle Filter">
    <input type="checkbox" id="filter" />
    <span>주요조항</span>
    <span>주의조항</span>
  </Switch>
);

export default Toggleswitch;
