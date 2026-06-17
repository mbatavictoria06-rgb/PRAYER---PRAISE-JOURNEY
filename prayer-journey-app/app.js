/* =============================================
   Prayer & Praise Journey - Application Logic
   ============================================= */

// ===== DATA STORE =====

// Array of Bible verses with references
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
  { text: "Delight yourself in the LORD, and he will give you the desires of your heart.", ref: "Psalm 37:4" }
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
  "He who began a good work in you will carry it on to completion."
];

// ===== STATE =====
let prayers = [];
let currentFilter = 'all';
let editMode = false;
let faithIndex = 0;

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

// ===== FAITH MOMENTS =====

function showFaithMoment(index) {
  faithText.textContent = faithMoments[index];
}

function showNextFaith() {
  faithIndex = (faithIndex + 1) % faithMoments.length;
  showFaithMoment(faithIndex);
}

// ===== FILTER PRAYERS =====

function getFilteredPrayers() {
  if (currentFilter === 'all') return prayers;
  return prayers.filter(p => p.status === currentFilter);
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
}

function createPrayerCard(prayer) {
  const card = document.createElement('div');
  card.className = `prayer-card ${prayer.status === 'answered' ? 'answered' : ''}`;
  card.dataset.id = prayer.id;

  const statusLabel = prayer.status === 'answered' ? 'Answered' : 'Pending';

  card.innerHTML = `
    <div class="card-header">
      <h3 class="card-title">${escapeHtml(prayer.title)}</h3>
      <span class="card-status-badge">${statusLabel}</span>
    </div>
    <p class="card-desc">${escapeHtml(prayer.description)}</p>
    <p class="card-date">📅 ${prayer.date}</p>
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
          <p class="gratitude-text">💛 "${escapeHtml(prayer.gratitudeNote)}"</p>
          <div class="gratitude-actions">
            <button class="btn btn-small btn-outline edit-gratitude-btn" data-id="${prayer.id}">
              <i class="fas fa-edit"></i> Edit
            </button>
          </div>
        ` : `
          <label for="gratitude-${prayer.id}"><i class="fas fa-heart"></i> Gratitude Reflection</label>
          <textarea id="gratitude-${prayer.id}" class="gratitude-input" rows="2" placeholder="What are you grateful for?"></textarea>
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
          <i class="fas fa-check-circle"></i> Answered
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

// Create / Update prayer
function handleFormSubmit(e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  const songLink = songInput.value.trim();

  if (!title || !description) return;

  const editId = editIdInput.value;

  if (editId) {
    // Update existing prayer
    const prayer = prayers.find(p => p.id === editId);
    if (prayer) {
      prayer.title = title;
      prayer.description = description;
      prayer.songLink = songLink || '';
      prayer.date = getDateStr();
      saveToStorage();
      renderPrayers();
      resetForm();
    }
  } else {
    // Create new prayer
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

// Mark prayer as answered
function markPrayerAnswered(id) {
  const prayer = prayers.find(p => p.id === id);
  if (!prayer) return;

  prayer.status = 'answered';
  prayer.answeredDate = getShortDate();
  saveToStorage();
  renderPrayers();
}

// Save gratitude note
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

// Edit gratitude note (switches back to textarea mode)
function editGratitude(id, cardElement) {
  const prayer = prayers.find(p => p.id === id);
  if (!prayer) return;

  const section = cardElement.querySelector('.gratitude-section');
  section.innerHTML = `
    <label for="gratitude-edit-${id}"><i class="fas fa-heart"></i> Gratitude Reflection</label>
    <textarea id="gratitude-edit-${id}" class="gratitude-input" rows="2" placeholder="What are you grateful for?">${escapeHtml(prayer.gratitudeNote)}</textarea>
    <div class="gratitude-actions">
      <button class="btn btn-small btn-success save-gratitude-btn" data-id="${id}">
        <i class="fas fa-check"></i> Save Gratitude
      </button>
    </div>
  `;

  const saveBtn = section.querySelector('.save-gratitude-btn');
  saveBtn.addEventListener('click', () => saveGratitude(id, cardElement));
}

// Start edit mode
function startEdit(id) {
  const prayer = prayers.find(p => p.id === id);
  if (!prayer) return;

  editIdInput.value = prayer.id;
  titleInput.value = prayer.title;
  descInput.value = prayer.description;
  songInput.value = prayer.songLink || '';
  formSubmitBtn.innerHTML = '<i class="fas fa-save"></i> Update Prayer';
  editMode = true;

  // Scroll to form
  prayerForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Delete prayer
function deletePrayer(id) {
  if (!confirm('Are you sure you want to delete this prayer?')) return;

  prayers = prayers.filter(p => p.id !== id);
  saveToStorage();
  renderPrayers();

  // If we were editing this prayer, reset form
  if (editIdInput.value === id) {
    resetForm();
  }
}

// Reset form
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
  // Load data from localStorage
  loadFromStorage();

  // Show random Bible verse
  showRandomVerse();

  // Show first faith moment
  showFaithMoment(0);

  // Render existing prayers
  renderPrayers();

  // ---- Event Listeners ----

  // Form submit
  prayerForm.addEventListener('submit', handleFormSubmit);

  // Next faith moment
  nextFaithBtn.addEventListener('click', showNextFaith);

  // Filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => setFilter(btn.dataset.filter));
  });

  // Reset form when clicking cancel (pressing Escape will naturally reset)
  // Add keyboard shortcut: Escape resets form
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && editMode) {
      resetForm();
    }
  });
}

// ===== START THE APP =====
document.addEventListener('DOMContentLoaded', init);
