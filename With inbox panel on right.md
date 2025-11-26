# With inbox panel on right





<!DOCTYPE html>

<html lang="en">

<head>

&nbsp;   <meta charset="UTF-8">

&nbsp;   <meta name="viewport" content="width=device-width, initial-scale=1.0">

&nbsp;   <title>Notion-Style To-do List</title>

&nbsp;   <!-- Tailwind CSS CDN -->

&nbsp;   <script src="https://cdn.tailwindcss.com"></script>

&nbsp;   <link rel="preconnect" href="https://fonts.googleapis.com">

&nbsp;   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

&nbsp;   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700\&display=swap" rel="stylesheet">

&nbsp;   <style>

&nbsp;       body {

&nbsp;           font-family: 'Inter', sans-serif;

&nbsp;           overflow: hidden; /\* Prevents scroll on the body \*/

&nbsp;       }

&nbsp;       .main-content {

&nbsp;           transition: filter 0.3s ease-in-out, transform 0.3s ease-in-out;

&nbsp;       }

&nbsp;       .main-content.blurred {

&nbsp;           filter: blur(5px);

&nbsp;           transform: scale(1.02);

&nbsp;       }

&nbsp;       .side-panel-left {

&nbsp;           transition: transform 0.3s ease-in-out;

&nbsp;           transform: translateX(-100%);

&nbsp;       }

&nbsp;       .side-panel-left.open {

&nbsp;           transform: translateX(0);

&nbsp;       }

&nbsp;       .side-panel-right {

&nbsp;           transition: transform 0.3s ease-in-out;

&nbsp;           transform: translateX(100%);

&nbsp;       }

&nbsp;       .side-panel-right.open {

&nbsp;           transform: translateX(0);

&nbsp;       }

&nbsp;       /\* Custom scrollbar for the panel \*/

&nbsp;       .side-panel-content::-webkit-scrollbar {

&nbsp;           width: 8px;

&nbsp;       }

&nbsp;       .side-panel-content::-webkit-scrollbar-thumb {

&nbsp;           background-color: #d1d5db; /\* gray-300 \*/

&nbsp;           border-radius: 4px;

&nbsp;       }

&nbsp;       .modal {

&nbsp;           background-color: rgba(0, 0, 0, 0.5);

&nbsp;           backdrop-filter: blur(4px);

&nbsp;           transition: opacity 0.3s ease-in-out;

&nbsp;           opacity: 0;

&nbsp;           pointer-events: none;

&nbsp;       }

&nbsp;       .modal.show {

&nbsp;           opacity: 1;

&nbsp;           pointer-events: auto;

&nbsp;       }

&nbsp;       .modal-content {

&nbsp;           transform: translateY(-20px);

&nbsp;           transition: transform 0.3s ease-in-out;

&nbsp;       }

&nbsp;       .modal.show .modal-content {

&nbsp;           transform: translateY(0);

&nbsp;       }

&nbsp;       .task-name.completed {

&nbsp;           text-decoration: line-through;

&nbsp;           color: #9ca3af; /\* gray-400 \*/

&nbsp;       }

&nbsp;   </style>

</head>

<body class="bg-gray-100 flex h-screen transition-colors duration-500">



&nbsp;   <!-- Toggle button for the left side panel -->

&nbsp;   <button id="toggle-panel" class="absolute top-4 left-4 p-3 bg-white rounded-lg shadow-md text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 z-50">

&nbsp;       <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">

&nbsp;           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />

&nbsp;       </svg>

&nbsp;   </button>



&nbsp;   <!-- Main Content Area -->

&nbsp;   <div id="main-content" class="main-content w-full h-full p-8 flex flex-col items-center justify-center text-center bg-white rounded-lg shadow-xl max-w-4xl mx-auto my-4 transition-colors duration-300 overflow-y-auto">

&nbsp;       <!-- Content will be injected here by JavaScript -->

&nbsp;   </div>



&nbsp;   <!-- Left Side Panel (Menu) -->

&nbsp;   <aside id="side-panel-left" class="side-panel-left fixed top-0 left-0 h-screen w-64 bg-white shadow-2xl z-50 flex flex-col p-4 overflow-hidden rounded-r-lg transition-colors duration-300">

&nbsp;       <!-- Panel Header -->

&nbsp;       <div class="flex items-center justify-between p-2">

&nbsp;            <button id="close-left-panel" class="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none">

&nbsp;               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">

&nbsp;                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />

&nbsp;               </svg>

&nbsp;           </button>

&nbsp;       </div>



&nbsp;       <!-- Panel Items -->

&nbsp;       <div class="side-panel-content flex-grow overflow-y-auto">

&nbsp;           <!-- Add Task -->

&nbsp;           <div id="add-task-btn" class="flex items-center text-red-500 font-medium cursor-pointer py-2 px-3 rounded-md hover:bg-red-50 transition-colors mb-2">

&nbsp;               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">

&nbsp;                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>

&nbsp;               </svg>

&nbsp;               <span class="ml-2">Add task</span>

&nbsp;           </div>



&nbsp;           <nav id="tasks-container" class="space-y-1">

&nbsp;                <!-- Home -->

&nbsp;               <div id="home-btn" class="flex items-center text-gray-700 font-medium cursor-pointer py-2 px-3 rounded-md hover:bg-gray-100 transition-colors">

&nbsp;                   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">

&nbsp;                       <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7-2 2M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3M9 21h6a2 2 0 002-2v-7a1 1 0 00-1-1H8a1 1 0 00-1 1v7a2 2 0 002 2z" />

&nbsp;                   </svg>

&nbsp;                   <span class="ml-2">Home</span>

&nbsp;               </div>

&nbsp;                <!-- Search -->

&nbsp;               <div class="flex items-center text-gray-700 font-medium cursor-pointer py-2 px-3 rounded-md hover:bg-gray-100 transition-colors" data-task-name="Search" data-due-date="">

&nbsp;                   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">

&nbsp;                       <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />

&nbsp;                   </svg>

&nbsp;                   <span class="ml-2">Search</span>

&nbsp;               </div>

&nbsp;               <!-- Inbox -->

&nbsp;               <div id="inbox-btn" class="flex items-center text-gray-700 font-medium cursor-pointer py-2 px-3 rounded-md hover:bg-gray-100 transition-colors" data-task-name="Inbox" data-due-date="">

&nbsp;                   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">

&nbsp;                       <path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0h-2.583a4.004 4.004 0 01-7.087 0H4a2 2 0 00-2 2v2a2 2 0 002 2h16a2 2 0 002-2v-2a2 2 0 00-2-2z" />

&nbsp;                   </svg>

&nbsp;                   <span class="ml-2">Inbox</span>

&nbsp;                   <span id="inbox-counter" class="ml-auto text-gray-500 text-sm">0</span>

&nbsp;               </div>

&nbsp;               <!-- Today -->

&nbsp;               <div class="flex items-center text-gray-700 font-medium cursor-pointer py-2 px-3 rounded-md hover:bg-gray-100 transition-colors" data-task-name="Today" data-due-date="">

&nbsp;                   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">

&nbsp;                       <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />

&nbsp;                   </svg>

&nbsp;                   <span class="ml-2">Today</span>

&nbsp;                   <span id="today-counter" class="ml-auto text-red-500 text-sm">0</span>

&nbsp;               </div>

&nbsp;               <!-- Upcoming -->

&nbsp;               <div class="flex items-center text-gray-700 font-medium cursor-pointer py-2 px-3 rounded-md hover:bg-gray-100 transition-colors" data-task-name="Upcoming" data-due-date="">

&nbsp;                   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">

&nbsp;                       <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />

&nbsp;                   </svg>

&nbsp;                   <span class="ml-2">Upcoming</span>

&nbsp;               </div>

&nbsp;               <!-- Completed -->

&nbsp;               <div id="completed-btn" class="flex items-center text-gray-700 font-medium cursor-pointer py-2 px-3 rounded-md hover:bg-gray-100 transition-colors" data-task-name="Completed" data-due-date="">

&nbsp;                   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">

&nbsp;                       <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />

&nbsp;                   </svg>

&nbsp;                   <span class="ml-2">Completed</span>

&nbsp;                   <span id="completed-counter" class="ml-auto text-gray-500 text-sm">0</span>

&nbsp;               </div>

&nbsp;               <!-- More -->

&nbsp;               <div class="flex items-center text-gray-700 font-medium cursor-pointer py-2 px-3 rounded-md hover:bg-gray-100 transition-colors" data-task-name="More" data-due-date="">

&nbsp;                   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">

&nbsp;                       <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />

&nbsp;                   </svg>

&nbsp;                   <span class="ml-2">More</span>

&nbsp;               </div>

&nbsp;           </nav>



&nbsp;           <hr class="my-4 border-t border-gray-200">



&nbsp;           <div class="mt-4">

&nbsp;               <p class="text-xs text-gray-500 uppercase font-semibold tracking-wider px-3 mb-2">My Projects</p>

&nbsp;               <div id="getting-started-btn" class="flex items-center text-gray-700 font-medium cursor-pointer py-2 px-3 rounded-md hover:bg-gray-100 transition-colors">

&nbsp;                   <span class="text-gray-400 font-bold mr-2">#</span>

&nbsp;                   <span>Getting Started ✨</span>

&nbsp;                   <span class="ml-auto text-gray-400 text-sm">13</span>

&nbsp;               </div>

&nbsp;           </div>



&nbsp;           <hr class="my-4 border-t border-gray-200">

&nbsp;       </div>

&nbsp;   </aside>



&nbsp;   <!-- Right Side Panel (Inbox) -->

&nbsp;   <aside id="inbox-panel-right" class="side-panel-right fixed top-0 right-0 h-screen w-64 bg-white shadow-2xl z-50 flex flex-col p-4 overflow-hidden rounded-l-lg transition-colors duration-300">

&nbsp;       <div class="flex items-center justify-between p-2">

&nbsp;           <h2 class="text-xl font-bold text-gray-800">Inbox</h2>

&nbsp;           <button id="close-inbox-panel" class="text-gray-500 hover:text-gray-700 transition-colors focus:outline-none">

&nbsp;               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">

&nbsp;                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />

&nbsp;               </svg>

&nbsp;           </button>

&nbsp;       </div>

&nbsp;       <div id="inbox-panel-content" class="side-panel-content flex-grow overflow-y-auto mt-4">

&nbsp;           <!-- Inbox tasks will be rendered here -->

&nbsp;       </div>

&nbsp;   </aside>



&nbsp;   <!-- Task Modal -->

&nbsp;   <div id="task-modal" class="modal fixed inset-0 flex items-center justify-center p-4 z-50">

&nbsp;       <div class="modal-content bg-white rounded-xl shadow-xl p-6 w-full max-w-sm transition-colors duration-300">

&nbsp;           <h2 id="modal-title" class="text-xl font-bold text-gray-800 mb-4">Add New Task</h2>

&nbsp;           <input type="text" id="task-input" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-3 bg-white text-gray-800" placeholder="Enter task name...">

&nbsp;           <input type="date" id="date-input" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-4 bg-white text-gray-800">

&nbsp;           <div class="flex justify-end space-x-2">

&nbsp;               <button id="cancel-task-btn" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">

&nbsp;                   Cancel

&nbsp;               </button>

&nbsp;               <button id="delete-task-btn" class="px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors hidden">

&nbsp;                   Delete

&nbsp;               </button>

&nbsp;               <button id="save-task-btn" class="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">

&nbsp;                   Add

&nbsp;               </button>

&nbsp;           </div>

&nbsp;       </div>

&nbsp;   </div>

&nbsp;   

&nbsp;   <!-- Image Edit Modal -->

&nbsp;   <div id="image-edit-modal" class="modal fixed inset-0 flex items-center justify-center p-4 z-50">

&nbsp;       <div class="modal-content bg-white rounded-xl shadow-xl p-6 w-full max-w-sm transition-colors duration-300">

&nbsp;           <h2 class="text-xl font-bold text-gray-800 mb-4">Edit Card Image</h2>

&nbsp;           <input type="url" id="image-url-input" class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3 bg-white text-gray-800" placeholder="Enter new image URL...">

&nbsp;           <div class="flex justify-end space-x-2">

&nbsp;               <button id="cancel-image-btn" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">

&nbsp;                   Cancel

&nbsp;               </button>

&nbsp;               <button id="save-image-btn" class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">

&nbsp;                   Save

&nbsp;               </button>

&nbsp;           </div>

&nbsp;       </div>

&nbsp;   </div>



&nbsp;   <script>

&nbsp;       const sidePanelLeft = document.getElementById('side-panel-left');

&nbsp;       const inboxPanelRight = document.getElementById('inbox-panel-right');

&nbsp;       const mainContent = document.getElementById('main-content');

&nbsp;       const toggleButton = document.getElementById('toggle-panel');

&nbsp;       const closeLeftButton = document.getElementById('close-left-panel');

&nbsp;       const closeInboxButton = document.getElementById('close-inbox-panel');

&nbsp;       const addTaskBtn = document.getElementById('add-task-btn');

&nbsp;       const homeBtn = document.getElementById('home-btn');

&nbsp;       const inboxBtn = document.getElementById('inbox-btn');

&nbsp;       const completedBtn = document.getElementById('completed-btn');

&nbsp;       

&nbsp;       // Modal elements

&nbsp;       const taskModal = document.getElementById('task-modal');

&nbsp;       const modalTitle = document.getElementById('modal-title');

&nbsp;       const taskInput = document.getElementById('task-input');

&nbsp;       const dateInput = document.getElementById('date-input');

&nbsp;       const saveTaskBtn = document.getElementById('save-task-btn');

&nbsp;       const cancelTaskBtn = document.getElementById('cancel-task-btn');

&nbsp;       const deleteTaskBtn = document.getElementById('delete-task-btn');

&nbsp;       const inboxPanelContent = document.getElementById('inbox-panel-content');

&nbsp;       

&nbsp;       // Image modal elements

&nbsp;       const imageEditModal = document.getElementById('image-edit-modal');

&nbsp;       const imageUrlInput = document.getElementById('image-url-input');

&nbsp;       const saveImageBtn = document.getElementById('save-image-btn');

&nbsp;       const cancelImageBtn = document.getElementById('cancel-image-btn');

&nbsp;       let currentCardId = null;



&nbsp;       // Counters

&nbsp;       const inboxCounter = document.getElementById('inbox-counter');

&nbsp;       const completedCounter = document.getElementById('completed-counter');

&nbsp;       const todayCounter = document.getElementById('today-counter');



&nbsp;       let tasks = \[]; // Single source of truth for all tasks

&nbsp;       let currentTaskBeingEdited = null;

&nbsp;       

&nbsp;       let recentCards = \[

&nbsp;           { id: '1', title: 'My Project Plan', timeAgo: '2w ago', imageUrl: 'https://placehold.co/400x200/e2e8f0/64748b?text=Project' },

&nbsp;           { id: '2', title: 'Meeting Notes', timeAgo: '1w ago', imageUrl: 'https://placehold.co/400x200/e2e8f0/64748b?text=Notes' },

&nbsp;           { id: '3', title: 'Brainstorming', timeAgo: '5d ago', imageUrl: 'https://placehold.co/400x200/e2e8f0/64748b?text=Brainstorm' },

&nbsp;           { id: '4', title: 'Q3 Report', timeAgo: '2d ago', imageUrl: 'https://placehold.co/400x200/e2e8f0/64748b?text=Report' }

&nbsp;       ];

&nbsp;       

&nbsp;       // --- Functions for task management and rendering ---



&nbsp;       function saveTasks() {

&nbsp;           localStorage.setItem('tasks', JSON.stringify(tasks));

&nbsp;       }



&nbsp;       function loadTasks() {

&nbsp;           const storedTasks = localStorage.getItem('tasks');

&nbsp;           if (storedTasks) {

&nbsp;               tasks = JSON.parse(storedTasks);

&nbsp;           } else {

&nbsp;               tasks = \[

&nbsp;                   { id: Date.now() + 1, name: 'Finish Notion-style app', completed: false, dueDate: '' },

&nbsp;                   { id: Date.now() + 2, name: 'Plan weekend trip', completed: false, dueDate: '' }

&nbsp;               ];

&nbsp;               saveTasks();

&nbsp;           }

&nbsp;       }

&nbsp;       

&nbsp;       function updateCounters() {

&nbsp;           const inboxCount = tasks.filter(task => !task.completed).length;

&nbsp;           const completedCount = tasks.filter(task => task.completed).length;

&nbsp;           const todayCount = tasks.filter(task => {

&nbsp;               const today = new Date().toISOString().slice(0, 10);

&nbsp;               return task.dueDate === today \&\& !task.completed;

&nbsp;           }).length;

&nbsp;           

&nbsp;           inboxCounter.textContent = inboxCount;

&nbsp;           completedCounter.textContent = completedCount;

&nbsp;           todayCounter.textContent = todayCount;

&nbsp;       }



&nbsp;       function renderInboxPanelContent() {

&nbsp;            const incompleteTasks = tasks.filter(task => !task.completed);

&nbsp;            

&nbsp;            if (incompleteTasks.length === 0) {

&nbsp;                inboxPanelContent.innerHTML = `

&nbsp;                   <div class="mt-8 flex flex-col items-center justify-center p-6 text-gray-600 text-center">

&nbsp;                       <svg class="h-16 w-16 mb-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">

&nbsp;                           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5l-3.5-3.5 1.5-1.5 2 2 4-4 1.5 1.5-5.5 5.5z"/>

&nbsp;                       </svg>

&nbsp;                       <h3 class="font-semibold text-lg">You're all caught up!</h3>

&nbsp;                   </div>

&nbsp;                `;

&nbsp;            } else {

&nbsp;                const tasksHtml = incompleteTasks.map(task => {

&nbsp;                    const completedClass = task.completed ? 'completed' : '';

&nbsp;                    const completedIcon = task.completed ? 

&nbsp;                       `<path d="M22 11.08V12a10 10 0 1 1-5.93-8.64"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>` :

&nbsp;                       `<circle cx="12" cy="12" r="10"></circle>`;

&nbsp;                   

&nbsp;                    let dueDateHtml = '';

&nbsp;                    if (task.dueDate) {

&nbsp;                        const formattedDate = new Date(task.dueDate + 'T00:00:00').toLocaleDateString('en-US', {

&nbsp;                            month: 'short',

&nbsp;                            day: 'numeric'

&nbsp;                        });

&nbsp;                        dueDateHtml = `<span class="due-date ml-auto text-xs text-gray-500">${formattedDate}</span>`;

&nbsp;                    }



&nbsp;                    return `

&nbsp;                        <div class="task-item flex items-center justify-between text-gray-700 font-medium py-2 px-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer" data-task-id="${task.id}">

&nbsp;                            <div class="flex items-center">

&nbsp;                                <svg class="complete-btn h-6 w-6 text-gray-400 mr-2 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">

&nbsp;                                    ${completedIcon}

&nbsp;                                </svg>

&nbsp;                                <span class="task-name ${completedClass}">${task.name}</span>

&nbsp;                            </div>

&nbsp;                            <div class="flex items-center">

&nbsp;                                ${dueDateHtml}

&nbsp;                                <svg class="delete-btn h-6 w-6 text-gray-400 hover:text-red-500 ml-2 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">

&nbsp;                                    <line x1="18" y1="6" x2="6" y2="18"></line>

&nbsp;                                    <line x1="6" y1="6" x2="18" y2="18"></line>

&nbsp;                                </svg>

&nbsp;                            </div>

&nbsp;                        </div>

&nbsp;                    `;

&nbsp;                }).join('');

&nbsp;                inboxPanelContent.innerHTML = `<div id="tasks-list" class="space-y-1">${tasksHtml}</div>`;

&nbsp;            }

&nbsp;       }

&nbsp;       

&nbsp;       function renderMainContent(filter = 'home') {

&nbsp;           let title = '';

&nbsp;           let contentHtml = '';



&nbsp;           if (filter === 'home') {

&nbsp;               title = 'Good evening';

&nbsp;               const recentCardsHtml = recentCards.map(card => `

&nbsp;                   <div class="card bg-white rounded-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-\[1.02]" data-card-id="${card.id}">

&nbsp;                       <div class="relative w-full h-32 bg-gray-200">

&nbsp;                           <img src="${card.imageUrl}" alt="${card.title}" class="w-full h-full object-cover">

&nbsp;                           <button class="edit-card-btn absolute top-2 right-2 p-2 bg-black bg-opacity-30 text-white rounded-full hover:bg-opacity-50 transition-all duration-300">

&nbsp;                               <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">

&nbsp;                                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />

&nbsp;                               </svg>

&nbsp;                           </button>

&nbsp;                       </div>

&nbsp;                       <div class="p-4 text-left">

&nbsp;                           <h3 class="font-semibold text-gray-800">${card.title}</h3>

&nbsp;                           <p class="text-sm text-gray-500">${card.timeAgo}</p>

&nbsp;                       </div>

&nbsp;                   </div>

&nbsp;               `).join('');

&nbsp;               

&nbsp;               contentHtml = `

&nbsp;                   <div class="bg-gray-100 p-6 rounded-xl shadow-inner flex items-center justify-between mb-8">

&nbsp;                       <div class="space-y-1">

&nbsp;                           <h3 class="font-bold text-gray-800">Looking for Notion AI?</h3>

&nbsp;                           <p class="text-sm text-gray-500">Try full-page Notion AI from the sidebar</p>

&nbsp;                       </div>

&nbsp;                       <button class="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">Try it</button>

&nbsp;                   </div>

&nbsp;                   <div>

&nbsp;                       <h3 class="text-lg font-bold text-gray-800 mb-4">Recent</h3>

&nbsp;                       <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">

&nbsp;                           ${recentCardsHtml}

&nbsp;                       </div>

&nbsp;                   </div>

&nbsp;               `;



&nbsp;           } else if (filter === 'completed') {

&nbsp;               title = 'Completed';

&nbsp;               const completedTasks = tasks.filter(task => task.completed);

&nbsp;               if (completedTasks.length === 0) {

&nbsp;                   contentHtml = `

&nbsp;                      <div class="mt-8 flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg text-gray-600">

&nbsp;                          <svg class="h-16 w-16 mb-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">

&nbsp;                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5l-3.5-3.5 1.5-1.5 2 2 4-4 1.5 1.5-5.5 5.5z"/>

&nbsp;                          </svg>

&nbsp;                          <h3 class="font-semibold text-lg">No completed tasks yet</h3>

&nbsp;                      </div>

&nbsp;                   `;

&nbsp;               } else {

&nbsp;                   const tasksHtml = completedTasks.map(task => {

&nbsp;                       return `

&nbsp;                           <div class="task-item flex items-center justify-between text-gray-700 font-medium py-2 px-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer" data-task-id="${task.id}">

&nbsp;                               <div class="flex items-center">

&nbsp;                                   <svg class="complete-btn h-6 w-6 text-green-400 mr-2 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">

&nbsp;                                       <path d="M22 11.08V12a10 10 0 1 1-5.93-8.64"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>

&nbsp;                                   </svg>

&nbsp;                                   <span class="task-name completed">${task.name}</span>

&nbsp;                               </div>

&nbsp;                               <div class="flex items-center">

&nbsp;                                   <svg class="delete-btn h-6 w-6 text-gray-400 hover:text-red-500 ml-2 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">

&nbsp;                                       <line x1="18" y1="6" x2="6" y2="18"></line>

&nbsp;                                       <line x1="6" y1="6" x2="18" y2="18"></line>

&nbsp;                                   </svg>

&nbsp;                               </div>

&nbsp;                           </div>

&nbsp;                       `;

&nbsp;                   }).join('');

&nbsp;                   contentHtml = `<div id="tasks-list" class="space-y-1 mt-4">${tasksHtml}</div>`;

&nbsp;               }

&nbsp;           } else if (filter === 'tutorial') {

&nbsp;               title = 'Getting Started ✨';

&nbsp;               contentHtml = `

&nbsp;                   <div class="space-y-6 text-gray-700">

&nbsp;                       <div>

&nbsp;                           <h3 class="font-semibold text-lg">1. Add a New Task</h3>

&nbsp;                           <p>Click the \*\*"Add task"\*\* button with the plus icon in the sidebar. A pop-up will appear where you can type your new task and even set a due date.</p>

&nbsp;                       </div>

&nbsp;                       <div>

&nbsp;                           <h3 class="font-semibold text-lg">2. Mark a Task as Complete</h3>

&nbsp;                           <p>Once a task is finished, click the \*\*circle icon\*\* next to it. The task will be struck through and automatically moved to the \*\*"Completed"\*\* section.</p>

&nbsp;                       </div>

&nbsp;                       <div>

&nbsp;                           <h3 class="font-semibold text-lg">3. Un-complete a Task</h3>

&nbsp;                           <p>If you marked a task as complete by mistake, just click the \*\*check mark icon\*\* in the \*\*"Completed"\*\* section to move it back to your \*\*"Inbox"\*\*.</p>

&nbsp;                       </div>

&nbsp;                       <div>

&nbsp;                           <h3 class="font-semibold text-lg">4. Edit or Delete a Task</h3>

&nbsp;                           <p>Click on the \*\*text of any task\*\* to open a pop-up where you can edit its name, change the due date, or delete the task entirely.</p>

&nbsp;                       </div>

&nbsp;                   </div>

&nbsp;               `;

&nbsp;           }

&nbsp;           

&nbsp;           mainContent.innerHTML = `

&nbsp;               <div class="w-full text-left p-8">

&nbsp;                   <h2 class="text-4xl font-bold text-gray-800 mb-4">${title}</h2>

&nbsp;                   ${contentHtml}

&nbsp;               </div>

&nbsp;           `;

&nbsp;       }



&nbsp;       function handleTaskSubmit() {

&nbsp;           const taskName = taskInput.value.trim();

&nbsp;           const dueDate = dateInput.value;



&nbsp;           if (taskName === '') {

&nbsp;               return;

&nbsp;           }



&nbsp;           if (currentTaskBeingEdited) {

&nbsp;               // Editing an existing task

&nbsp;               const taskIndex = tasks.findIndex(task => task.id === currentTaskBeingEdited.id);

&nbsp;               if (taskIndex !== -1) {

&nbsp;                   tasks\[taskIndex].name = taskName;

&nbsp;                   tasks\[taskIndex].dueDate = dueDate;

&nbsp;               }

&nbsp;           } else {

&nbsp;               // Adding a new task

&nbsp;               const newTask = {

&nbsp;                   id: Date.now(),

&nbsp;                   name: taskName,

&nbsp;                   completed: false,

&nbsp;                   dueDate: dueDate

&nbsp;               };

&nbsp;               tasks.unshift(newTask); // Add to the beginning of the array

&nbsp;           }



&nbsp;           saveTasks();

&nbsp;           hideModal();

&nbsp;           updateCounters();

&nbsp;           renderMainContent('home'); // Go back to home page after saving

&nbsp;       }



&nbsp;       function deleteTask(taskId) {

&nbsp;           tasks = tasks.filter(task => task.id !== taskId);

&nbsp;           saveTasks();

&nbsp;           hideModal();

&nbsp;           updateCounters();

&nbsp;           renderMainContent('completed');

&nbsp;       }



&nbsp;       // --- Original functions ---



&nbsp;       function toggleLeftPanel() {

&nbsp;           if (inboxPanelRight.classList.contains('open')) {

&nbsp;               inboxPanelRight.classList.remove('open');

&nbsp;           }

&nbsp;           sidePanelLeft.classList.toggle('open');

&nbsp;           mainContent.classList.toggle('blurred');

&nbsp;       }



&nbsp;       function toggleInboxPanel() {

&nbsp;           if (sidePanelLeft.classList.contains('open')) {

&nbsp;               sidePanelLeft.classList.remove('open');

&nbsp;           }

&nbsp;           inboxPanelRight.classList.toggle('open');

&nbsp;           mainContent.classList.toggle('blurred');

&nbsp;           if (inboxPanelRight.classList.contains('open')) {

&nbsp;               renderInboxPanelContent();

&nbsp;           }

&nbsp;       }



&nbsp;       function showModal(mode, taskId = null) {

&nbsp;           taskModal.classList.add('show');

&nbsp;           taskInput.focus();



&nbsp;           if (mode === 'add') {

&nbsp;               modalTitle.textContent = 'Add New Task';

&nbsp;               saveTaskBtn.textContent = 'Add';

&nbsp;               deleteTaskBtn.classList.add('hidden');

&nbsp;               currentTaskBeingEdited = null;

&nbsp;           } else if (mode === 'edit' \&\& taskId) {

&nbsp;               modalTitle.textContent = 'Edit Task';

&nbsp;               saveTaskBtn.textContent = 'Save';

&nbsp;               deleteTaskBtn.classList.remove('hidden');

&nbsp;               const taskToEdit = tasks.find(task => task.id === taskId);

&nbsp;               currentTaskBeingEdited = taskToEdit;

&nbsp;               taskInput.value = taskToEdit.name || '';

&nbsp;               dateInput.value = taskToEdit.dueDate || '';

&nbsp;           }

&nbsp;       }



&nbsp;       function hideModal() {

&nbsp;           taskModal.classList.remove('show');

&nbsp;           taskInput.value = '';

&nbsp;           dateInput.value = '';

&nbsp;           currentTaskBeingEdited = null;

&nbsp;       }

&nbsp;       

&nbsp;       function showImageEditModal(cardId) {

&nbsp;           currentCardId = cardId;

&nbsp;           const card = recentCards.find(c => c.id === cardId);

&nbsp;           if (card) {

&nbsp;               imageUrlInput.value = card.imageUrl;

&nbsp;           }

&nbsp;           imageEditModal.classList.add('show');

&nbsp;       }

&nbsp;       

&nbsp;       function hideImageEditModal() {

&nbsp;           imageEditModal.classList.remove('show');

&nbsp;           currentCardId = null;

&nbsp;           imageUrlInput.value = '';

&nbsp;       }



&nbsp;       // --- Event Listeners ---



&nbsp;       toggleButton.addEventListener('click', toggleLeftPanel);

&nbsp;       closeLeftButton.addEventListener('click', toggleLeftPanel);

&nbsp;       closeInboxButton.addEventListener('click', toggleInboxPanel);



&nbsp;       addTaskBtn.addEventListener('click', () => showModal('add'));

&nbsp;       saveTaskBtn.addEventListener('click', handleTaskSubmit);

&nbsp;       cancelTaskBtn.addEventListener('click', hideModal);

&nbsp;       deleteTaskBtn.addEventListener('click', () => deleteTask(currentTaskBeingEdited.id));



&nbsp;       taskModal.addEventListener('click', (e) => {

&nbsp;           if (e.target === taskModal) hideModal();

&nbsp;       });

&nbsp;       

&nbsp;       saveImageBtn.addEventListener('click', () => {

&nbsp;           const newUrl = imageUrlInput.value.trim();

&nbsp;           if (newUrl \&\& currentCardId) {

&nbsp;               const cardIndex = recentCards.findIndex(c => c.id === currentCardId);

&nbsp;               if (cardIndex !== -1) {

&nbsp;                   recentCards\[cardIndex].imageUrl = newUrl;

&nbsp;                   localStorage.setItem('recentCards', JSON.stringify(recentCards));

&nbsp;                   renderMainContent('home');

&nbsp;               }

&nbsp;           }

&nbsp;           hideImageEditModal();

&nbsp;       });

&nbsp;       cancelImageBtn.addEventListener('click', hideImageEditModal);

&nbsp;       imageEditModal.addEventListener('click', (e) => {

&nbsp;           if (e.target === imageEditModal) hideImageEditModal();

&nbsp;       });



&nbsp;       document.getElementById('getting-started-btn').addEventListener('click', () => renderMainContent('tutorial'));

&nbsp;       homeBtn.addEventListener('click', () => renderMainContent('home'));

&nbsp;       inboxBtn.addEventListener('click', toggleInboxPanel);

&nbsp;       completedBtn.addEventListener('click', () => renderMainContent('completed'));

&nbsp;       document.getElementById('today-counter').parentElement.addEventListener('click', () => renderMainContent('today'));





&nbsp;       // Event delegation for tasks in the main content area

&nbsp;       mainContent.addEventListener('click', (e) => {

&nbsp;           const taskItem = e.target.closest('.task-item');

&nbsp;           if (taskItem) {

&nbsp;               const taskId = parseInt(taskItem.dataset.taskId);

&nbsp;               if (e.target.closest('.delete-btn')) {

&nbsp;                   deleteTask(taskId);

&nbsp;               } else if (e.target.closest('.complete-btn')) {

&nbsp;                   const task = tasks.find(t => t.id === taskId);

&nbsp;                   if (task) {

&nbsp;                       task.completed = !task.completed;

&nbsp;                       saveTasks();

&nbsp;                       updateCounters();

&nbsp;                       renderMainContent('completed');

&nbsp;                   }

&nbsp;               }

&nbsp;               return;

&nbsp;           }



&nbsp;           const editCardBtn = e.target.closest('.edit-card-btn');

&nbsp;           if (editCardBtn) {

&nbsp;               const card = e.target.closest('.card');

&nbsp;               const cardId = card.dataset.cardId;

&nbsp;               showImageEditModal(cardId);

&nbsp;           }

&nbsp;       });



&nbsp;       // Event delegation for tasks in the new right panel

&nbsp;       inboxPanelRight.addEventListener('click', (e) => {

&nbsp;            const taskItem = e.target.closest('.task-item');

&nbsp;            if (!taskItem) return;



&nbsp;            const taskId = parseInt(taskItem.dataset.taskId);

&nbsp;            if (e.target.closest('.delete-btn')) {

&nbsp;                deleteTask(taskId);

&nbsp;            } else if (e.target.closest('.complete-btn')) {

&nbsp;                const task = tasks.find(t => t.id === taskId);

&nbsp;                if (task) {

&nbsp;                    task.completed = !task.completed;

&nbsp;                    saveTasks();

&nbsp;                    updateCounters();

&nbsp;                    renderInboxPanelContent();

&nbsp;                }

&nbsp;            } else {

&nbsp;                showModal('edit', taskId);

&nbsp;            }

&nbsp;       });



&nbsp;       // Initialize content on page load

&nbsp;       (function init() {

&nbsp;           loadTasks();

&nbsp;           updateCounters();

&nbsp;           renderMainContent('home');

&nbsp;       })();

&nbsp;   </script>

</body>

</html>



