import React from "react";
import { Container } from "./Container";

const About = () => {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
          About PredictiveAF
        </h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-relaxed">
            At PredictiveAF, we are a team of dedicated professionals passionate
            about redefining the standards of property management. Our expertise
            spans across various fields, including mechanical systems, software
            development, and customer support, allowing us to create a
            comprehensive solution tailored to your needs.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">
            What We Do
          </h2>
          <p className="text-gray-600 leading-relaxed">
            PredictiveAF is a purpose-built software designed specifically for
            managing mechanical systems within your properties. Unlike
            traditional property management software that primarily focuses on
            financials, tenant relationships, and work orders, PredictiveAF
            automates the maintenance of mechanical systems. This automation not
            only boosts property upkeep but also ensures that critical
            maintenance information is readily accessible.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">
            Our Features
          </h2>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed">
            <li>
              <strong>Digital Transparency:</strong> Provide clear, real-time
              insights to all stakeholders, ensuring everyone is informed and
              aligned.
            </li>
            <li>
              <strong>Role-Based Access:</strong> Define specific user roles and
              permissions, allowing you to control who can perform which tasks
              within the application.
            </li>
            <li>
              <strong>Instant Access to Maintenance Data:</strong> Quickly
              retrieve and review maintenance information to ensure your
              properties are always in top condition.
            </li>
            <li>
              <strong>Comprehensive Overviews:</strong> Facility owners can
              enjoy a view-only snapshot of their properties and subsystems,
              offering a detailed yet concise look at their assets.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">
            Why Choose PredictiveAF?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our software is designed with your needs in mind. We understand the
            complexities of property management and the importance of
            maintaining mechanical systems. With PredictiveAF, you gain a
            powerful tool that simplifies maintenance processes, enhances
            transparency, and gives you complete control over your operations.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Join us in transforming property management and experience the
            benefits of a streamlined, automated approach to mechanical systems
            maintenance. With PredictiveAF, the power to manage your properties
            efficiently and effectively is at your fingertips.
          </p>
        </section>
      </Container>
    </section>
  );
};

export default About;
