<a name="title"></a>
# Meculator 
> The Meculator, as I really wanted.
---

<a name="summary"></a>
## Summary
1. [Title](#title)
2. Summary
3. [Brief](#brief)
	1. [General Objectives](#general-objectives)
	2. [Persistence](#persistence-brief)
	3. [Backend](#backend-brief)
	4. [Frontend](#frontend-brief)

---

<a name="brief"></a>
## Brief

Not the first time that I'm going to implement it. I even have another github repository with a version more focused on doing it while apply Vue.js as frontend framework, but it's not of my liking because I'd like a backend solutions that might fit better to the tool (not simply for the graduation course).

<a name="general-objectives"></a>
### General Objectives

0. **Core**

The idea is to have a tool based on a web application that might be able to help the learning of physics through manipulating quantities.<p>
With the time the idea is to increasingly gather more complex features. <p>

**Putting in another way:**

- Physics quantities manipulations;
- More intuitive physics;
- WEB application.


1. **User**

While using this tool the user must be able to manipulate quantities, by setting it's attributes and so getting a better understanding of how they are related to other variables - how they work.<p>

Furthermore, users should have accounts to make use of the application (by session or persistent) and also have at least the option to set the language to english and portuguese.<p>

The most advanced uses, that I forsee for this application, would be to have natural language embedded in to the features.

**Summarizing:**

- Quantities attributes manipulations;
- Pratical understanding of physics;
- Multiple languages options;
- Natural language uses (for a distant future).


2. **Implementation**

Here might not have much to be said, beside the obvious. The application must be resilient, easy to maintain, have a good availability and use up to date technological solutions.

**In keypoints:**

- Available;
- Resilient;
- Maintainable;
- Up to date solutions;

<a name="persistence-brief"></a>
### Persistence

The solutions for this might be left open. But in the way I already see it, core funtions (such as storing users, vectors, moments and etc.) should be held within a SQL database and future features it might be great to have a NOSQL solution integrated on features such as the manipulation history needed to solve a problem - and other things like that.


<a name="backend-brief"></a>
### Backend

Here the best solution, already looking after the distant future features with natural language, might be a python framework. For been more pratical I'm going to choose the FastAPI framework.<p>
For the natural language I'm definitely going to use prompt engineering integrated with external LLM service through APIs for the features that are going to make use of natural language.<p>
For now I have no ideia wich add-ons I'm goint to be using with the FastAPI.


<a name="frontend-brief"></a>
### Frontend
Vue.js, pinia and bootstrap are going to be frameworks that will be used for this part. I'll focus on not using custom made components, seeking a production time save.

---
