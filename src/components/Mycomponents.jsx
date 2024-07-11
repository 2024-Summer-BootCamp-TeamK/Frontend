import React from "react";
import styled from "styled-components";

/* Group 72 */
const Group72 = styled.div`
  position: absolute;
  width: 350px;
  height: 411px;
  left: 63px;
  top: 1346px;
`;

/* Inner Group 72 */
const InnerGroup72 = styled.div`
  position: absolute;
  width: 350px;
  height: 428px;
  left: 11px;
  top: 0px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

/* Rectangle 229 */
const Rectangle229 = styled.div`
  position: absolute;
  left: 2.97%;
  right: 2.43%;
  top: 3.79%;
  bottom: 4.69%;
  background: #fffef3;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
`;

/* Rectangle 230 */
const Rectangle230 = styled.div`
  position: absolute;
  left: 2.97%;
  right: 2.43%;
  top: 63.84%;
  bottom: 4.46%;
  background: #141f7b;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0px 0px 30px 30px;
`;

/* Text */
const Text = styled.div`
  position: absolute;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 24px;
  color: #fcfbec;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const Text1 = styled(Text)`
  left: 33.78%;
  right: 32.97%;
  top: 83.48%;
  bottom: 11.16%;
`;

const Text2 = styled(Text)`
  left: 24.32%;
  right: 23.51%;
  top: 76.12%;
  bottom: 18.53%;
`;

const Text3 = styled(Text)`
  left: 42.7%;
  right: 42.16%;
  top: 69.2%;
  bottom: 25.45%;
`;

/* Image 191 */
const Image191 = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  left: 86px;
  top: 68px;
  background: url("image.png");
`;

/* Vector */
const Vector = styled.div`
  position: absolute;
  left: 45.68%;
  right: 46.22%;
  top: 1.12%;
  bottom: 92.18%;
  background: #e7320a;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  transform: rotate(-9.66deg);
`;

const MyComponent = () => (
  <Group72>
    <InnerGroup72>
      <Rectangle229 />
      <Rectangle230 />
      <Text1>서명하시나요?</Text1>
      <Text2>꼼꼼히 검토하지 못하고</Text2>
      <Text3>계약서</Text3>
      <Image191 />
      <Vector />
    </InnerGroup72>
  </Group72>
);

export default MyComponent;
