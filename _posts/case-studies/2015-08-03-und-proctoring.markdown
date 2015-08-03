---
layout: post
title: "UND Proctoring Web Application"
type: case
date: 2015-08-03 11:06:01
author: Rand Seay
permalink: /case/und-proctoring
categories: Work, Web Application
deck: "The University of North Dakota Online & Distance Education needed a new system to manage test proctoring for term-based online & distance courses. We built it."
---

UND Online & Distance Education already had a Proctoring system that [our team](https://cts.ndus.edu/sits-departments/enterprise-services/) was maintaining, but it was built eons ago in Coldfusion 9. To its credit, this app has been chugging along faithfully for years, handling substantial traffic and playing a critical role in online education at UND &mdash;but it was time for a rebuild.

<a href="https://apps2.und.edu/proctoring" class="button radius">Go to the finished product</a>

With quite a few legacy apps written in CF 9 that will need to be migrated, our team was given a license for ColdFusion 11 and we carved out the time needed to plan and build it. Inital client meetings gave us enough to get started on, and the scope was quickly established. We targeted a RESTful style to the application, making inevitable enhancements straightforward. Tasks were parcelled out to team members in a semi-agile way, and we started in on it. I was responsible for the front-end architecture and user experience.

## Mockups

Using the fantastic mockup software [Balsamiq](https://balsamiq.com/), I began creating mockups with the intention of using [Foundation](https://foundation.zurb.com) as a front end framework.


Mockup 1: A student view for designating a proctor.

<img src="{{ '/img/work/proctoring/mockup-designate.png' | prepend: site.baseurl }}" alt="University of North Dakota Proctoring Mockup for Designating a Proctor">

Mockup 2: A student view for reviewing a designation.

<img src="{{ '/img/work/proctoring/mockup-review.png' | prepend: site.baseurl }}" alt="University of North Dakota Proctoring Mockup for Reviewing a Designation">

Mockup 3: An instructor or administrator view a particular section.

<img src="{{ '/img/work/proctoring/mockup-section.png' | prepend: site.baseurl }}" alt="University of North Dakota Proctoring Mockup for Section View">

## Implementation

The front end was implemented using a customized verison of Foundation with project-specific styles written in Sass. I also incorporated Foundicons, jQuery, jQuery dataTables, jQuery's AJAX tooling, Modernizr, and Sweetalert to polish off the user experience and fetch and display data.. Finally, I levereged Grunt and Bower to make it all work together.

The final result was UND's very first responsive web application. Designed with the user in mind, preliminary user testing showed that students could designate proctors much more quickly and efficiently (less than 30 seconds), proctors could claim their account and review designations without much hassle, and instructors and administrators could perform their duties uninhibited.

This project endured scope creep and turnover within the team, and was nearly given to a consultant during its Alpha days. It survived a three-month moratorium during development, but came through it all in the end. During this time I took over the project lead on it, and became familiar with the entire application from top to bottom. Our team was down to two members, but we managed to deploy it for the Summer 2015 despite our regular maintenance load. It is growing into a mature project, and has completely taken over for the old system, which was unceremoniously unplugged. Here are some final screenshots.

Screenshot 1: Logging into the system.

<img src="{{ '/img/work/proctoring/screenshot-3-logging-in.png' | prepend: site.baseurl }}" alt="University of North Dakota Proctoring Login Screenshot">

Screenshot 2: The home view.

<img src="{{ '/img/work/proctoring/screenshot-4-home.png' | prepend: site.baseurl }}" alt="University of North Dakota Proctoring Home Screenshot">

Screenshot 3: The impersonation interface.

<img src="{{ '/img/work/proctoring/screenshot-5-impersonate.png' | prepend: site.baseurl }}" alt="University of North Dakota Proctoring Impersonate Screenshot">

Screenshot 4: The questionable proctor view.

<img src="{{ '/img/work/proctoring/screenshot-7-questionable.png' | prepend: site.baseurl }}" alt="University of North Dakota Proctoring Questionable Proctor Screenshot">

Screenshot 5: The proctor list.

<img src="{{ '/img/work/proctoring/screenshot-8-proctors.png' | prepend: site.baseurl }}" alt="University of North Dakota Proctoring Proctor List Screenshot">

Screenshot 6: A specific proctor view.

<img src="{{ '/img/work/proctoring/screenshot-9-proctor.png' | prepend: site.baseurl }}" alt="University of North Dakota Proctoring View Proctor Screenshot">

Screenshot 7: Edit a specific proctor.

<img src="{{ '/img/work/proctoring/screenshot-10-proctor-edit.png' | prepend: site.baseurl }}" alt="University of North Dakota Proctoring Edit Proctor Screenshot">

Screenshot 8: The sections list.

<img src="{{ '/img/work/proctoring/screenshot-11-sections.png' | prepend: site.baseurl }}" alt="University of North Dakota Proctoring Sections List Screenshot">

Screenshot 9: View a specific section.

<img src="{{ '/img/work/proctoring/screenshot-12-section.png' | prepend: site.baseurl }}" alt="University of North Dakota Proctoring View a Section Screenshot">

Screenshot 10: View designations as a proctor.

<img src="{{ '/img/work/proctoring/screenshot-14-designations.png' | prepend: site.baseurl }}" alt="University of North Dakota Proctoring View Designations as a Proctor Screenshot">

Screenshot 11: View disignations for a proctor as an administrator.

<img src="{{ '/img/work/proctoring/screenshot-15-designations.png' | prepend: site.baseurl }}" alt="University of North Dakota Proctoring View Designations for a Proctor as an Administrator Screenshot">
