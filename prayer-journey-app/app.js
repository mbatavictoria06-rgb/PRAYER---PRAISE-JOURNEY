/* =============================================
   Prayer & Praise Journey - Application Logic
   ============================================= */

// ===== DATA STORE =====

// Array of Bible verses — focused on prayer, waiting on God, faith, patience
const bibleVerses = [
  { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.", ref: "Joshua 1:9" },
  { text: "The LORD is my shepherd, I lack nothing.", ref: "Psalm 23:1" },
  { text: "I can do all this through him who gives me strength.", ref: "Philippians 4:13" },
  { text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.", ref: "Jeremiah 29:11" },
  { text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", ref: "Philippians 4:6" },
  { text: "The prayer of a righteous person is powerful and effective.", ref: "James 5:16" },
  { text: "Trust in the LORD with all your heart and lean not on your own understanding.", ref: "Proverbs 3:5" },
  { text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", ref: "Romans 8:28" },
  { text: "Cast all your anxiety on him because he cares for you.", ref: "1 Peter 5:7" },
  { text: "The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you.", ref: "Numbers 6:24-25" },
  { text: "Rejoice always, pray continually, give thanks in all circumstances; for this is God's will for you in Christ Jesus.", ref: "1 Thessalonians 5:16-18" },
  { text: "But those who hope in the LORD will renew their strength. They will soar on wings like eagles.", ref: "Isaiah 40:31" },
  { text: "God is our refuge and strength, an ever-present help in trouble.", ref: "Psalm 46:1" },
  { text: "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.", ref: "Matthew 7:7" },
  { text: "Delight yourself in the LORD, and he will give you the desires of your heart.", ref: "Psalm 37:4" },
  // ——— Prayer & Waiting on God ———
  { text: "Wait for the LORD; be strong and take heart and wait for the LORD.", ref: "Psalm 27:14" },
  { text: "But they who wait for the LORD shall renew their strength; they shall mount up with wings like eagles.", ref: "Isaiah 40:31" },
  { text: "The LORD is good to those who wait for him, to the soul who seeks him.", ref: "Lamentations 3:25" },
  { text: "Be still before the LORD and wait patiently for him.", ref: "Psalm 37:7" },
  { text: "I wait for the LORD, my whole being waits, and in his word I put my hope.", ref: "Psalm 130:5" },
  { text: "Yet the LORD longs to be gracious to you; therefore he will rise up to show you compassion. Blessed are all who wait for him!", ref: "Isaiah 30:18" },
  { text: "Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours.", ref: "Mark 11:24" },
  { text: "If you remain in me and my words remain in you, ask whatever you wish, and it will be done for you.", ref: "John 15:7" },
  { text: "This is the confidence we have in approaching God: that if we ask anything according to his will, he hears us.", ref: "1 John 5:14" },
  { text: "Devote yourselves to prayer, being watchful and thankful.", ref: "Colossians 4:2" },
  { text: "Pray without ceasing.", ref: "1 Thessalonians 5:17" },
  { text: "The LORD has heard my cry for mercy; the LORD accepts my prayer.", ref: "Psalm 6:9" },
  { text: "In the morning, LORD, you hear my voice; in the morning I lay my requests before you and wait expectantly.", ref: "Psalm 5:3" },
  { text: "Let us then approach God's throne of grace with confidence, so that we may receive mercy and find grace to help us in our time of need.", ref: "Hebrews 4:16" },
  { text: "Call to me and I will answer you and tell you great and unsearchable things you do not know.", ref: "Jeremiah 33:3" },
  { text: "Before they call I will answer; while they are still speaking I will hear.", ref: "Isaiah 65:24" },
  { text: "The LORD is near to all who call on him, to all who call on him in truth.", ref: "Psalm 145:18" },
  { text: "He will call on me, and I will answer him; I will be with him in trouble, I will deliver him and honor him.", ref: "Psalm 91:15" },
  { text: "Be joyful in hope, patient in affliction, faithful in prayer.", ref: "Romans 12:12" },
  { text: "Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance.", ref: "James 1:2-3" },
  { text: "But if we hope for what we do not yet have, we wait for it patiently.", ref: "Romans 8:25" },
  { text: "The waiting period is not wasted time — it is preparation time. God is working behind the scenes.", ref: "Isaiah 64:4" },
  { text: "My soul, wait silently for God alone, for my expectation is from Him.", ref: "Psalm 62:5" },
  { text: "I would have lost heart, unless I had believed that I would see the goodness of the LORD in the land of the living. Wait on the LORD; be of good courage, and He shall strengthen your heart.", ref: "Psalm 27:13-14" },
  { text: "The LORD will fight for you; you need only to be still.", ref: "Exodus 14:14" },
  { text: "Commit your way to the LORD; trust in him and he will do this.", ref: "Psalm 37:5" }
];

// Array of rotating faith moments
const faithMoments = [
  "God is working even in silence.",
  "Gratitude changes everything.",
  "You are not alone on this journey.",
  "Your prayers are never wasted.",
  "Faith is the bridge between where you are and where God wants you to be.",
  "The darkest nights produce the brightest stars.",
  "Trust the process, even when you cannot see the path.",
  "Every sunrise is a fresh start from God.",
  "Peace does not mean to be in a place where there is no noise — it means to be calm in the middle of the storm.",
  "What God has for you is better than anything you can imagine.",
  "Your testimony is someone else's survival guide.",
  "He who began a good work in you will carry it on to completion.",
  "Waiting on God is never a detour — it is part of the journey.",
  "Your breakthrough is closer than it appears. Keep praying.",
  "God's timing is never late and never early — it is always perfect."
];

// ===== STATE =====
let prayers = [];
let studies = [];
let currentFilter = 'all';
let editMode = false;
let faithIndex = 0;
let studyVerseIndex = 0;

// ===== DOM REFERENCES =====
const prayerForm = document.getElementById('prayerForm');
const editIdInput = document.getElementById('editId');
const titleInput = document.getElementById('prayerTitle');
const descInput = document.getElementById('prayerDesc');
const songInput = document.getElementById('prayerSong');
const formSubmitBtn = document.getElementById('formSubmitBtn');
const prayerGrid = document.getElementById('prayerGrid');
const emptyState = document.getElementById('emptyState');
const prayerCount = document.getElementById('prayerCount');
const verseText = document.getElementById('verseText');
const verseRef = document.getElementById('verseRef');
const verseCard = document.getElementById('verseCard');
const faithText = document.getElementById('faithText');
const nextFaithBtn = document.getElementById('nextFaithBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const statsTotal = document.getElementById('statsTotal');
const statsAnswered = document.getElementById('statsAnswered');
const statsPending = document.getElementById('statsPending');
const gratitudeGrid = document.getElementById('gratitudeGrid');
const emptyGratitude = document.getElementById('emptyGratitude');

// Bible Study DOM references
const studyVerseText = document.getElementById('studyVerseText');
const studyVerseRef = document.getElementById('studyVerseRef');
const studyVerseCard = document.getElementById('studyVerseCard');
const studyReflection = document.getElementById('studyReflection');
const markStudiedBtn = document.getElementById('markStudiedBtn');
const nextStudyBtn = document.getElementById('nextStudyBtn');
const studyList = document.getElementById('studyList');
const emptyStudies = document.getElementById('emptyStudies');

// ===== UTILITY FUNCTIONS =====

function getDateStr() {
  const d = new Date();
  return d.toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function getShortDate() {
  const d = new Date();
  return d.toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/** Days between two date strings and now */
function daysSince(dateStr) {
  const then = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - then) / (1000 * 60 * 60 * 24));
  return diff;
}

/** Format days since into a readable waiting string */
function formatWaitingDays(dateStr) {
  const days = daysSince(dateStr);
  if (days === 0) return 'Today';
  if (days === 1) return '1 day';
  return days + ' days';
}

// ===== LOCAL STORAGE =====

function loadFromStorage() {
  try {
    const data = localStorage.getItem('prayerJourney_prayers');
    prayers = data ? JSON.parse(data) : [];
  } catch {
    prayers = [];
  }
}

function saveToStorage() {
  localStorage.setItem('prayerJourney_prayers', JSON.stringify(prayers));
}

// ===== BIBLE STUDY LOCAL STORAGE =====

function loadStudiesFromStorage() {
  try {
    const data = localStorage.getItem('prayerJourney_studies');
    studies = data ? JSON.parse(data) : [];
  } catch {
    studies = [];
  }
}

function saveStudiesToStorage() {
  localStorage.setItem('prayerJourney_studies', JSON.stringify(studies));
}

// ===== BIBLE VERSE =====

function showRandomVerse() {
  const idx = Math.floor(Math.random() * bibleVerses.length);
  const verse = bibleVerses[idx];
  verseText.textContent = `"${verse.text}"`;
  verseRef.textContent = `— ${verse.ref}`;
  // Trigger fade-in animation
  verseCard.classList.remove('fade-in');
  // Force reflow to restart animation
  void verseCard.offsetWidth;
  verseCard.classList.add('fade-in');
}

// ===== BIBLE STUDY =====

function showStudyVerse(index) {
  const verse = bibleVerses[index];
  studyVerseText.textContent = `"${verse.text}"`;
  studyVerseRef.textContent = `— ${verse.ref}`;
  // Trigger fade-in animation
  studyVerseCard.classList.remove('fade-in');
  void studyVerseCard.offsetWidth;
  studyVerseCard.classList.add('fade-in');
}

function getRandomStudyVerse() {
  studyVerseIndex = Math.floor(Math.random() * bibleVerses.length);
  showStudyVerse(studyVerseIndex);
}

function markAsStudied() {
  const reflection = studyReflection.value.trim();
  if (!reflection) {
    studyReflection.focus();
    return;
  }

  const verse = bibleVerses[studyVerseIndex];
  const study = {
    id: generateId(),
    verseText: verse.text,
    verseRef: verse.ref,
    reflection: reflection,
    date: getShortDate()
  };

  studies.unshift(study);
  saveStudiesToStorage();
  renderStudyHistory();

  // Clear reflection and show next verse
  studyReflection.value = '';
  getRandomStudyVerse();
}

function deleteStudy(id) {
  if (!confirm('Delete this study entry?')) return;
  studies = studies.filter(s => s.id !== id);
  saveStudiesToStorage();
  renderStudyHistory();
}

function renderStudyHistory() {
  if (studies.length === 0) {
    studyList.innerHTML = '';
    emptyStudies.classList.remove('hidden');
    return;
  }

  emptyStudies.classList.add('hidden');
  studyList.innerHTML = '';

  studies.forEach(study => {
    const item = document.createElement('div');
    item.className = 'study-list-item';
    item.innerHTML = `
      <p class="study-list-verse">${escapeHtml(study.verseRef)}</p>
      <p class="study-list-reflection">"${escapeHtml(study.reflection)}"</p>
      <p class="study-list-date">📖 ${study.date}</p>
      <button class="study-list-delete" data-id="${study.id}">
        <i class="fas fa-trash-alt"></i> Delete
      </button>
    `;
    studyList.appendChild(item);

    const deleteBtn = item.querySelector('.study-list-delete');
    deleteBtn.addEventListener('click', () => deleteStudy(study.id));
  });
}

// ===== FAITH MOMENTS =====

function showFaithMoment(index) {
  faithText.textContent = faithMoments[index];
}

function showNextFaith() {
  faithIndex = (faithIndex + 1) % faithMoments.length;
  showFaithMoment(faithIndex);
}

// ===== STATS =====

function renderStats() {
  const total = prayers.length;
  const answered = prayers.filter(p => p.status === 'answered').length;
  const pending = total - answered;

  statsTotal.textContent = total;
  statsAnswered.textContent = answered;
  statsPending.textContent = pending;
}

// ===== GRATITUDE GALLERY =====

function renderGratitudeGallery() {
  const gratitudeNotes = prayers.filter(p => p.status === 'answered' && p.gratitudeNote);

  if (gratitudeNotes.length === 0) {
    gratitudeGrid.innerHTML = '';
    emptyGratitude.classList.remove('hidden');
    return;
  }

  emptyGratitude.classList.add('hidden');
  gratitudeGrid.innerHTML = '';

  gratitudeNotes.forEach(prayer => {
    const card = document.createElement('div');
    card.className = 'gratitude-gallery-card';
    card.innerHTML = `
      <p class="gratitude-gallery-text">"${escapeHtml(prayer.gratitudeNote)}"</p>
      <p class="gratitude-gallery-prayer">— from <strong>${escapeHtml(prayer.title)}</strong></p>
      <p class="gratitude-gallery-date">💛 ${prayer.answeredDate}</p>
    `;
    gratitudeGrid.appendChild(card);
  });
}

// ===== FILTER PRAYERS =====

function getFilteredPrayers() {
  if (currentFilter === 'all') return prayers;
  return prayers.filter(p => p.status === currentFilter);
}

// ===== CELEBRATION EFFECT =====

function triggerCelebration() {
  // Create floating celebration particles
  const emojis = ['🙌', '✨', '💛', '🌟', '🎉', '🙏', '❤️', '🕊️', '☀️', '🌻'];
  const container = document.body;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'celebration-particle';
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 1.5 + 's';
    particle.style.fontSize = (Math.random() * 20 + 16) + 'px';
    // random horizontal drift
    particle.style.setProperty('--drift', (Math.random() * 200 - 100) + 'px');
    container.appendChild(particle);

    // Remove after animation
    setTimeout(() => particle.remove(), 3000);
  }
}

// ===== RENDER PRAYER CARDS =====

function renderPrayers() {
  const filtered = getFilteredPrayers();

  prayerGrid.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
    prayerGrid.classList.add('hidden');
  } else {
    emptyState.classList.add('hidden');
    prayerGrid.classList.remove('hidden');

    filtered.forEach(prayer => {
      const card = createPrayerCard(prayer);
      prayerGrid.appendChild(card);
    });
  }

  // Update count
  const total = prayers.length;
  prayerCount.textContent = total;

  // Update filter button states
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === currentFilter);
  });

  // Update stats and gratitude gallery
  renderStats();
  renderGratitudeGallery();
}

function createPrayerCard(prayer) {
  const card = document.createElement('div');
  card.className = `prayer-card ${prayer.status === 'answered' ? 'answered' : ''}`;
  card.dataset.id = prayer.id;

  const statusLabel = prayer.status === 'answered' ? 'Answered' : 'Pending';
  const waitingStr = prayer.status === 'pending' ? formatWaitingDays(prayer.date) : '';

  card.innerHTML = `
    <div class="card-header">
      <h3 class="card-title">${escapeHtml(prayer.title)}</h3>
      <span class="card-status-badge">${statusLabel}</span>
    </div>
    <p class="card-desc">${escapeHtml(prayer.description)}</p>
    <p class="card-date">📅 ${prayer.date}</p>
    ${prayer.status === 'pending' ? `<p class="card-waiting-date">⏳ Waiting: <strong>${waitingStr}</strong></p>` : ''}
    ${prayer.status === 'answered' && prayer.answeredDate ? `<p class="card-answered-date">🙌 Answered on: ${prayer.answeredDate}</p>` : ''}

    ${prayer.songLink ? `
      <div class="card-actions" style="border-top: none; padding-top: 0; margin-top: 0;">
        <a href="${escapeHtml(prayer.songLink)}" target="_blank" rel="noopener noreferrer" class="btn btn-small btn-song card-song-btn">
          <i class="fas fa-music"></i> Play Song 🎵
        </a>
      </div>
    ` : ''}

    ${prayer.status === 'answered' ? `
      <div class="gratitude-section">
        ${prayer.gratitudeNote ? `
          <div class="gratitude-display">
            <span class="gratitude-icon">💛</span>
            <p class="gratitude-text">"${escapeHtml(prayer.gratitudeNote)}"</p>
          </div>
          <div class="gratitude-actions">
            <button class="btn btn-small btn-outline edit-gratitude-btn" data-id="${prayer.id}">
              <i class="fas fa-edit"></i> Edit Gratitude
            </button>
          </div>
        ` : `
          <label for="gratitude-${prayer.id}"><i class="fas fa-heart"></i> Gratitude Reflection</label>
          <textarea id="gratitude-${prayer.id}" class="gratitude-input" rows="2" placeholder="What are you grateful for? How did God move?"></textarea>
          <div class="gratitude-actions">
            <button class="btn btn-small btn-success save-gratitude-btn" data-id="${prayer.id}">
              <i class="fas fa-check"></i> Save Gratitude
            </button>
          </div>
        `}
      </div>
    ` : ''}

    <div class="card-actions">
      ${prayer.status === 'pending' ? `
        <button class="btn btn-small btn-success mark-answered-btn" data-id="${prayer.id}">
          <i class="fas fa-check-circle"></i> Mark Answered
        </button>
      ` : ''}
      <button class="btn btn-small btn-outline edit-btn" data-id="${prayer.id}">
        <i class="fas fa-edit"></i> Edit
      </button>
      <button class="btn btn-small btn-danger delete-btn" data-id="${prayer.id}">
        <i class="fas fa-trash-alt"></i> Delete
      </button>
    </div>
  `;

  // Attach event listeners
  const markAnsweredBtn = card.querySelector('.mark-answered-btn');
  if (markAnsweredBtn) {
    markAnsweredBtn.addEventListener('click', () => markPrayerAnswered(prayer.id));
  }

  const editBtn = card.querySelector('.edit-btn');
  editBtn.addEventListener('click', () => startEdit(prayer.id));

  const deleteBtn = card.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => deletePrayer(prayer.id));

  const saveGratitudeBtn = card.querySelector('.save-gratitude-btn');
  if (saveGratitudeBtn) {
    saveGratitudeBtn.addEventListener('click', () => saveGratitude(prayer.id, card));
  }

  const editGratitudeBtn = card.querySelector('.edit-gratitude-btn');
  if (editGratitudeBtn) {
    editGratitudeBtn.addEventListener('click', () => editGratitude(prayer.id, card));
  }

  return card;
}

// ===== CRUD OPERATIONS =====

function handleFormSubmit(e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  const songLink = songInput.value.trim();

  if (!title || !description) return;

  const editId = editIdInput.value;

  if (editId) {
    const prayer = prayers.find(p => p.id === editId);
    if (prayer) {
      const wasAnswered = prayer.status === 'answered';
      prayer.title = title;
      prayer.description = description;
      prayer.songLink = songLink || '';
      prayer.date = getDateStr();
      // Preserve answered status and dates if it was already answered
      if (!wasAnswered) {
        prayer.status = 'pending';
      }
      saveToStorage();
      renderPrayers();
      resetForm();
    }
  } else {
    const newPrayer = {
      id: generateId(),
      title,
      description,
      songLink: songLink || '',
      date: getDateStr(),
      status: 'pending',
      answeredDate: null,
      gratitudeNote: ''
    };
    prayers.unshift(newPrayer);
    saveToStorage();
    renderPrayers();
    resetForm();
  }
}

function markPrayerAnswered(id) {
  const prayer = prayers.find(p => p.id === id);
  if (!prayer) return;

  prayer.status = 'answered';
  prayer.answeredDate = getShortDate();
  saveToStorage();
  renderPrayers();

  // Trigger celebration effect
  triggerCelebration();
}

function saveGratitude(id, cardElement) {
  const prayer = prayers.find(p => p.id === id);
  if (!prayer) return;

  const textarea = cardElement.querySelector('.gratitude-input');
  const note = textarea.value.trim();
  if (!note) return;

  prayer.gratitudeNote = note;
  saveToStorage();
  renderPrayers();
}

function editGratitude(id, cardElement) {
  const prayer = prayers.find(p => p.id === id);
  if (!prayer) return;

  const section = cardElement.querySelector('.gratitude-section');
  section.innerHTML = `
    <label for="gratitude-edit-${id}"><i class="fas fa-heart"></i> Gratitude Reflection</label>
    <textarea id="gratitude-edit-${id}" class="gratitude-input" rows="2" placeholder="What are you grateful for? How did God move?">${escapeHtml(prayer.gratitudeNote)}</textarea>
    <div class="gratitude-actions">
      <button class="btn btn-small btn-success save-gratitude-btn" data-id="${id}">
        <i class="fas fa-check"></i> Save Gratitude
      </button>
    </div>
  `;

  const saveBtn = section.querySelector('.save-gratitude-btn');
  saveBtn.addEventListener('click', () => saveGratitude(id, cardElement));
}

function startEdit(id) {
  const prayer = prayers.find(p => p.id === id);
  if (!prayer) return;

  editIdInput.value = prayer.id;
  titleInput.value = prayer.title;
  descInput.value = prayer.description;
  songInput.value = prayer.songLink || '';
  formSubmitBtn.innerHTML = '<i class="fas fa-save"></i> Update Prayer';
  editMode = true;

  prayerForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function deletePrayer(id) {
  if (!confirm('Are you sure you want to delete this prayer?')) return;

  prayers = prayers.filter(p => p.id !== id);
  saveToStorage();
  renderPrayers();

  if (editIdInput.value === id) {
    resetForm();
  }
}

function resetForm() {
  prayerForm.reset();
  editIdInput.value = '';
  formSubmitBtn.innerHTML = '<i class="fas fa-plus-circle"></i> Add Prayer';
  editMode = false;
}

// ===== FILTER HANDLING =====

function setFilter(filter) {
  currentFilter = filter;
  renderPrayers();
}

// ===== ESCAPE HTML =====

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ===== INITIALIZATION =====

function init() {
  loadFromStorage();
  loadStudiesFromStorage();
  showRandomVerse();
  showFaithMoment(0);
  getRandomStudyVerse();
  renderPrayers();
  renderStudyHistory();

  // Event Listeners
  prayerForm.addEventListener('submit', handleFormSubmit);
  nextFaithBtn.addEventListener('click', showNextFaith);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => setFilter(btn.dataset.filter));
  });

  markStudiedBtn.addEventListener('click', markAsStudied);
  nextStudyBtn.addEventListener('click', getRandomStudyVerse);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && editMode) {
      resetForm();
    }
  });
}

// ===== START THE APP =====
document.addEventListener('DOMContentLoaded', init);
