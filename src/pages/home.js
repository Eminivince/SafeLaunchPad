import React from "react";
import * as s from "../styles/global";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

// --- Subtle Fade-In Animation ---
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  } 
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// --- Local Styled Components for Missing Exports ---

// NavLink styled from s.StyledClickable (or a basic anchor style)
const NavLink = styled(s.StyledClickable)`
  margin: 0 10px;
  font-size: 16px;
  text-decoration: none;
  color: #333;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #007bff;
  }
`;

// Section container with a subtle fade-in.
const Section = styled(s.Container)`
  width: 100%;
  padding: 50px 0;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 1s ease-out;
`;

// HeroSection with a soft, static gradient background.
const HeroSection = styled(Section)`
  min-height: 70vh;
  justify-content: center;
  // background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
`;

// FeatureCard with a minimal hover effect.
const FeatureCard = styled(s.Card)`
  flex: 1;
  margin: 10px;
  padding: 20px;
  text-align: center;
  min-width: 250px;
  border-radius: 8px;
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-4px);
  }
`;

// FeatureIcon for icon display.
const FeatureIcon = styled(s.IconWrapper)`
  font-size: 150px;
  margin-bottom: 10px;
`;

// Footer with a clean, dark background and simple typography.
const Footer = styled(s.Container)`
  background: #222;
  color: #fff;
  padding: 20px;
  text-align: center;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  animation: ${fadeIn} 0.8s ease-out;
`;

// TextSmall for footer text.
const TextSmall = styled(s.Text)`
  font-size: 14px;
`;

// Button with a gentle scale effect on hover.
const Button = styled(s.button)`
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
  background: ${(props) =>
    props.primary ? "#007bff" : props.secondary ? "#6c757d" : "#007bff"};
  color: #fff;
  transition: transform 0.2s ease, opacity 0.2s ease;
  &:hover {
    opacity: 0.9;
    transform: scale(1.03);
  }
`;

// --- Homepage Component ---
const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection id="hero">
        <s.Container ai="center" jc="center">
          <s.TextTitle fs="80px" style={{ textAlign: "center", color: "#fff" }}>
            SafeLaunch
          </s.TextTitle>
          <s.TextDescription
            fs="24px"
            style={{
              textAlign: "center",
              maxWidth: "800px",
              margin: "20px auto",
              color: "#555",
            }}>
            SafeLaunch is a secure and reliable crypto launchpad designed to
            simplify your token launch. With top-tier security and full
            transparency, we provide everything you need to successfully bring
            your project to the blockchain.{" "}
          </s.TextDescription>
          <s.Container fd="row" jc="center" style={{ marginTop: "40px" }}>
            <Link to="/launchpad">
              {" "}
              <Button primary>Explore Launchpad</Button>
            </Link>
            <s.SpacerSmall horizontal />
            <Link to="/locker">
              {" "}
              <Button secondary>View Token Locker</Button>
            </Link>
          </s.Container>
        </s.Container>
      </HeroSection>

      {/* Launchpad Section */}
      <Section id="launchpad">
        <s.Container ai="center">
          <s.TextTitle fs="48px" style={{ marginBottom: "20px" }}>
            Launchpad
          </s.TextTitle>
          <s.TextDescription
            fs="18px"
            style={{
              textAlign: "center",
              maxWidth: "700px",
              color: "#555",
            }}>
            Participate in secure and transparent token sales. Our decentralized
            launchpad enables projects to launch seamlessly.
          </s.TextDescription>
          <s.SpacerLarge />
          <s.Container fd="row" jc="center" style={{ flexWrap: "wrap" }}>
            <FeatureCard
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <FeatureIcon>🚀</FeatureIcon>
              <s.TextTitle fs="24px" style={{ textAlign: "center" }}>
                Seamless Launches
              </s.TextTitle>
              <s.TextDescription style={{ textAlign: "center" }}>
                Launch your project with minimal fuss and maximum security.
              </s.TextDescription>
            </FeatureCard>
            <FeatureCard
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <FeatureIcon>🔒</FeatureIcon>
              <s.TextTitle fs="24px" style={{ textAlign: "center" }}>
                Robust Security
              </s.TextTitle>
              <s.TextDescription style={{ textAlign: "center" }}>
                Our platform is built with state-of-the-art security protocols.
              </s.TextDescription>
            </FeatureCard>
            <FeatureCard
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <FeatureIcon>⚡</FeatureIcon>
              <s.TextTitle fs="24px" style={{ textAlign: "center" }}>
                Fast Transactions
              </s.TextTitle>
              <s.TextDescription style={{ textAlign: "center" }}>
                Experience lightning-fast transactions and seamless
                interactions.
              </s.TextDescription>
            </FeatureCard>
          </s.Container>
        </s.Container>
      </Section>

      {/* Token Locker Section */}
      <Section id="token-locker">
        <s.Container ai="center">
          <s.TextTitle fs="48px" style={{ marginBottom: "20px" }}>
            Token Locker
          </s.TextTitle>
          <s.TextDescription
            fs="18px"
            style={{
              textAlign: "center",
              maxWidth: "700px",
              color: "#555",
            }}>
            Protect your tokens with our advanced token locker. Secure,
            transparent, and easy to use.
          </s.TextDescription>
          <s.SpacerLarge />
          <s.Container fd="row" jc="center" style={{ flexWrap: "wrap" }}>
            <FeatureCard
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <FeatureIcon>🔐</FeatureIcon>
              <s.TextTitle fs="24px" style={{ textAlign: "center" }}>
                Lock & Unlock
              </s.TextTitle>
              <s.TextDescription style={{ textAlign: "center" }}>
                Manage token locks with customizable schedules.
              </s.TextDescription>
            </FeatureCard>
            <FeatureCard
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <FeatureIcon>📊</FeatureIcon>
              <s.TextTitle fs="24px" style={{ textAlign: "center" }}>
                Transparency
              </s.TextTitle>
              <s.TextDescription style={{ textAlign: "center" }}>
                Full transparency with blockchain verifications.
              </s.TextDescription>
            </FeatureCard>
            <FeatureCard
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <FeatureIcon>💼</FeatureIcon>
              <s.TextTitle fs="24px" style={{ textAlign: "center" }}>
                Investor Trust
              </s.TextTitle>
              <s.TextDescription style={{ textAlign: "center" }}>
                Boost investor confidence with secure token management.
              </s.TextDescription>
            </FeatureCard>
          </s.Container>
        </s.Container>
      </Section>

      {/* About Section */}
      <Section
        id="about"
        style={{
          background: "#f9f9f9",
          padding: "50px 40px",
          borderRadius: "20px",
        }}>
        <s.Container ai="center">
          <s.TextTitle fs="48px" style={{ marginBottom: "20px", text: "#fff", color: "#fff" }}>
            About IDOFactory
          </s.TextTitle>
          <s.TextDescription
            fs="18px"
            style={{
              textAlign: "center",
              maxWidth: "800px",
              color: "#555",
            }}>
            IDOFactory is revolutionizing the way projects launch and manage
            tokens. Our platform offers a decentralized solution for launching
            and securing digital assets, ensuring security, transparency, and
            efficiency in every transaction.
          </s.TextDescription>
        </s.Container>
      </Section>
    </>
  );
};

export default Home;
