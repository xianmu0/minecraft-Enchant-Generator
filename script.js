const itemListEl = document.getElementById('item-list');
const enchantListEl = document.getElementById('enchant-list');
const commandOutputEl = document.getElementById('command-output');
const copyBtn = document.getElementById('copy-btn');
const enchantRowTemplate = document.getElementById('enchant-row-template');

const items = [
    { id: 'minecraft:netherite_sword', label: '下界合金剑' },
    { id: 'minecraft:netherite_axe', label: '下界合金斧' },
    { id: 'minecraft:mace', label: '重锤' },
    { id: 'minecraft:bow', label: '弓' },
    { id: 'minecraft:crossbow', label: '弩' },
    { id: 'minecraft:trident', label: '三叉戟' },
    { id: 'minecraft:netherite_pickaxe', label: '下界合金镐' },
    { id: 'minecraft:netherite_shovel', label: '下界合金锹' },
    { id: 'minecraft:netherite_hoe', label: '下界合金锄' },
    { id: 'minecraft:fishing_rod', label: '钓鱼竿' },
    { id: 'minecraft:shield', label: '盾牌' },
    { id: 'minecraft:elytra', label: '鞘翅' },
    { id: 'minecraft:netherite_helmet', label: '下界合金头盔' },
    { id: 'minecraft:netherite_chestplate', label: '下界合金胸甲' },
    { id: 'minecraft:netherite_leggings', label: '下界合金护腿' },
    { id: 'minecraft:netherite_boots', label: '下界合金靴子' }
];

const enchantments = [
    // 武器类
    { id: 'minecraft:punch', shortId: 'punch', label: '冲击', maxLevel: 2 },
    { id: 'minecraft:flame', shortId: 'flame', label: '火矢', maxLevel: 1 },
    { id: 'minecraft:infinity', shortId: 'infinity', label: '无限', maxLevel: 1 },
    { id: 'minecraft:sharpness', shortId: 'sharpness', label: '锋利', maxLevel: 5 },
    { id: 'minecraft:smite', shortId: 'smite', label: '亡灵杀手', maxLevel: 5 },
    { id: 'minecraft:bane_of_arthropods', shortId: 'bane_of_arthropods', label: '节肢杀手', maxLevel: 5 },
    { id: 'minecraft:knockback', shortId: 'knockback', label: '击退', maxLevel: 2 },
    { id: 'minecraft:fire_aspect', shortId: 'fire_aspect', label: '火焰附加', maxLevel: 2 },
    { id: 'minecraft:sweeping_edge', shortId: 'sweeping_edge', label: '横扫之刃', maxLevel: 3 },
    { id: 'minecraft:power', shortId: 'power', label: '力量', maxLevel: 5 },
    { id: 'minecraft:multishot', shortId: 'multishot', label: '多重射击', maxLevel: 1 },
    { id: 'minecraft:quick_charge', shortId: 'quick_charge', label: '快速上弦', maxLevel: 3 },
    { id: 'minecraft:impaling', shortId: 'impaling', label: '穿刺', maxLevel: 5 },
    { id: 'minecraft:riptide', shortId: 'riptide', label: '风爆', maxLevel: 3 },
    { id: 'minecraft:loyalty', shortId: 'loyalty', label: '忠诚', maxLevel: 3 },
    { id: 'minecraft:channeling', shortId: 'channeling', label: '引雷', maxLevel: 1 },
    { id: 'minecraft:density', shortId: 'density', label: '重击', maxLevel: 5 },
    { id: 'minecraft:breach', shortId: 'breach', label: '破甲', maxLevel: 4 },
    { id: 'minecraft:wind_burst', shortId: 'wind_burst', label: '风爆', maxLevel: 3 },
    { id: 'minecraft:looting', shortId: 'looting', label: '抢夺', maxLevel: 3 },

    // 工具类
    { id: 'minecraft:efficiency', shortId: 'efficiency', label: '效率', maxLevel: 5 },
    { id: 'minecraft:silk_touch', shortId: 'silk_touch', label: '精准采集', maxLevel: 1 },
    { id: 'minecraft:fortune', shortId: 'fortune', label: '时运', maxLevel: 3 },
    { id: 'minecraft:unbreaking', shortId: 'unbreaking', label: '耐久', maxLevel: 3 },
    { id: 'minecraft:mending', shortId: 'mending', label: '经验修补', maxLevel: 1 },
    { id: 'minecraft:lure', shortId: 'lure', label: '饵钓', maxLevel: 3 },
    { id: 'minecraft:luck_of_the_sea', shortId: 'luck_of_the_sea', label: '海之眷顾', maxLevel: 3 },

    // 装备类
    { id: 'minecraft:protection', shortId: 'protection', label: '保护', maxLevel: 4 },
    { id: 'minecraft:fire_protection', shortId: 'fire_protection', label: '火焰保护', maxLevel: 4 },
    { id: 'minecraft:blast_protection', shortId: 'blast_protection', label: '爆炸保护', maxLevel: 4 },
    { id: 'minecraft:projectile_protection', shortId: 'projectile_protection', label: '弹射物保护', maxLevel: 4 },
    { id: 'minecraft:thorns', shortId: 'thorns', label: '荆棘', maxLevel: 3 },
    { id: 'minecraft:feather_falling', shortId: 'feather_falling', label: '摔落保护', maxLevel: 4 },
    { id: 'minecraft:frost_walker', shortId: 'frost_walker', label: '冰霜行者', maxLevel: 2 },
    { id: 'minecraft:depth_strider', shortId: 'depth_strider', label: '深海探索者', maxLevel: 3 },
    { id: 'minecraft:respiration', shortId: 'respiration', label: '水下呼吸', maxLevel: 3 },
    { id: 'minecraft:aqua_affinity', shortId: 'aqua_affinity', label: '水下速掘', maxLevel: 1 },
    { id: 'minecraft:soul_speed', shortId: 'soul_speed', label: '灵魂疾行', maxLevel: 3 },
    { id: 'minecraft:swift_sneak', shortId: 'swift_sneak', label: '迅捷潜行', maxLevel: 3 },

    // 其它占位
    { id: 'minecraft:bending', shortId: 'bending', label: '弯曲(数据包占位)', maxLevel: 1 }
];

let openDropdown = null;
let currentItemId = null;
const selectedEnchantments = new Map();

function renderItems() {
    const fragment = document.createDocumentFragment();
    items.forEach((item) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'item-btn';
        button.textContent = item.label;
        button.dataset.itemId = item.id;
        button.addEventListener('click', () => handleItemSelect(item.id, button));
        fragment.appendChild(button);
    });
    itemListEl.appendChild(fragment);
}

function renderEnchantments() {
    const fragment = document.createDocumentFragment();
    enchantments.forEach((ench) => {
        const row = enchantRowTemplate.content.firstElementChild.cloneNode(true);
        const nameEl = row.querySelector('.enchant-name');
        const dropdownEl = row.querySelector('.enchant-dropdown');

        nameEl.textContent = `${ench.label} (${ench.shortId})`;
        buildEnchantDropdown(dropdownEl, ench);
        fragment.appendChild(row);
    });
    enchantListEl.appendChild(fragment);
}

function buildEnchantDropdown(dropdownEl, enchantment) {
    const toggleBtn = dropdownEl.querySelector('.dropdown-toggle');
    const menuEl = dropdownEl.querySelector('.dropdown-menu');

    dropdownEl.dataset.enchantId = enchantment.shortId;
    dropdownEl.dataset.selectedLevel = '0';
    toggleBtn.textContent = '无';

    const createOption = (level, label) => {
        const optionBtn = document.createElement('button');
        optionBtn.type = 'button';
        optionBtn.className = 'dropdown-item';
        optionBtn.dataset.value = String(level);
        optionBtn.textContent = label;
        if (level === 0) {
            optionBtn.classList.add('is-active');
        }
        optionBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            handleDropdownSelect(dropdownEl, optionBtn);
        });
        menuEl.appendChild(optionBtn);
    };

    createOption(0, '无');
    for (let lvl = 1; lvl <= enchantment.maxLevel; lvl += 1) {
        createOption(lvl, `等级 ${lvl}`);
    }

    toggleBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleDropdown(dropdownEl);
    });

    dropdownEl.addEventListener('click', (event) => {
        event.stopPropagation();
    });
}

function toggleDropdown(dropdownEl) {
    if (openDropdown && openDropdown !== dropdownEl) {
        closeDropdown(openDropdown);
    }

    const shouldOpen = !dropdownEl.classList.contains('is-open');
    if (shouldOpen) {
        dropdownEl.classList.add('is-open');
        openDropdown = dropdownEl;
    } else {
        closeDropdown(dropdownEl);
    }
}

function closeDropdown(dropdownEl) {
    dropdownEl.classList.remove('is-open');
    if (openDropdown === dropdownEl) {
        openDropdown = null;
    }
}

function handleDropdownSelect(dropdownEl, optionBtn) {
    if (!currentItemId) {
        closeDropdown(dropdownEl);
        return;
    }

    const enchantId = dropdownEl.dataset.enchantId;
    const level = Number(optionBtn.dataset.value);

    setDropdownSelection(dropdownEl, level, optionBtn.textContent);
    applyEnchantSelection(enchantId, level);
    closeDropdown(dropdownEl);
}

function setDropdownSelection(dropdownEl, level, label) {
    const toggleBtn = dropdownEl.querySelector('.dropdown-toggle');

    dropdownEl.dataset.selectedLevel = String(level);
    toggleBtn.textContent = label;

    dropdownEl.querySelectorAll('.dropdown-item').forEach((item) => {
        item.classList.toggle('is-active', item.dataset.value === String(level));
    });
}

function applyEnchantSelection(enchantId, level) {
    if (level === 0) {
        selectedEnchantments.delete(enchantId);
    } else {
        selectedEnchantments.set(enchantId, level);
    }
    updateCommand();
}

function handleItemSelect(itemId, button) {
    currentItemId = itemId;
    selectedEnchantments.clear();
    resetAllEnchantDropdowns();
    highlightSelectedItem(button);
    updateCommand();
}

function resetAllEnchantDropdowns() {
    if (openDropdown) {
        closeDropdown(openDropdown);
    }

    const dropdowns = enchantListEl.querySelectorAll('.enchant-dropdown');
    dropdowns.forEach((dropdownEl) => {
        dropdownEl.dataset.selectedLevel = '0';
        const toggleBtn = dropdownEl.querySelector('.dropdown-toggle');
        toggleBtn.textContent = '无';
        dropdownEl.querySelectorAll('.dropdown-item').forEach((item) => {
            item.classList.toggle('is-active', item.dataset.value === '0');
        });
    });
}

function highlightSelectedItem(activeButton) {
    const buttons = itemListEl.querySelectorAll('.item-btn');
    buttons.forEach((btn) => {
        btn.classList.toggle('is-selected', btn === activeButton);
    });
}

function updateCommand() {
    if (!currentItemId) {
        commandOutputEl.value = '';
        commandOutputEl.placeholder = '请先选择物品...';
        return;
    }

    const enchantmentsPart = buildEnchantmentsComponent();
    const command = `give @s ${currentItemId}[${enchantmentsPart}]`;
    commandOutputEl.value = command;
}

function buildEnchantmentsComponent() {
    if (selectedEnchantments.size === 0) {
        return 'minecraft:enchantments={}';
    }
    const entries = Array.from(selectedEnchantments.entries())
        .map(([id, level]) => `${id}:${level}`);
    return `minecraft:enchantments={${entries.join(',')}}`;
}

async function handleCopy() {
    const command = commandOutputEl.value.trim();
    if (!command) {
        copyBtn.textContent = '无内容';
        setTimeout(() => {
            copyBtn.textContent = '复制指令';
        }, 1000);
        return;
    }
    try {
        await navigator.clipboard.writeText(command);
        copyBtn.textContent = '已复制';
        setTimeout(() => {
            copyBtn.textContent = '复制指令';
        }, 1500);
    } catch (error) {
        copyBtn.textContent = '复制失败';
        setTimeout(() => {
            copyBtn.textContent = '复制指令';
        }, 1500);
    }
}

copyBtn.addEventListener('click', handleCopy);

document.addEventListener('click', () => {
    if (openDropdown) {
        closeDropdown(openDropdown);
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && openDropdown) {
        closeDropdown(openDropdown);
    }
});

renderItems();
renderEnchantments();