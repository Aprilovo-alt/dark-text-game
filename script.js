// 遊戲狀態：記錄理智值與道具收集
let gameState = {
    sanity: 100,      // 理智值 (0 到 100)
    hasSkyPhoto: false // 是否偷藏了舊時代天空照片
};

// 宏大的暗黑恐怖劇情資料庫
const storyNodes = {
    // --- 【第一章：晨曦的審查室】 ---
    start: {
        text: "【Day 1 - 08:00】\n\n終端機螢幕閃爍著綠光，刺鼻的消毒水味充斥著狹小的房間。\n『編號 404 審查員，早安。今日待審查市民檔案：12 份。』\n\n桌面上躺著第一份報告。市民 #892 昨天在廣場上公開質疑了配給糧食的重量。根據條例，這屬於煽動叛亂。",
        action: () => { gameState.sanity = 100; gameState.hasSkyPhoto = false; },
        choices: [
            { text: "標記為「異議分子」，送往重教育區。", next: "day1_obey" },
            { text: "篡改數據為「系統誤判」，暗中放他一馬。", next: "day1_mercy" },
            { text: "試圖透過地下加密頻道私下聯絡 #892。", next: "day1_contact" }
        ]
    },
    
    // 分支 1：服從體制
    day1_obey: {
        text: "你點擊了確認。印表機吐出紙條：『已清除。感謝您的忠誠。』\n\n你心裡有些罪惡感，但安全過關了。下午，你迎來了第二個檔案：一個關於「舊時代天空照片」的違禁品舉報。",
        action: () => { gameState.sanity -= 5; },
        choices: [
            { text: "直接銷毀照片，回報無異常。", next: "day1_afternoon_normal" },
            { text: "偷偷把照片下載到口袋裡自己看。", next: "day1_afternoon_secret" }
        ]
    },

    // 分支 2：慈悲（扣理智）
    day1_mercy: {
        text: "你悄悄修改了數據庫。螢幕突然閃爍起刺目的紅光。\n\n『警告。偵測到微弱邏輯異常。已扣除 15 點理智。』\n\n你的太陽穴開始隱隱作痛，彷彿腦海深處有什麼東西正在甦醒或剝落。",
        action: () => { gameState.sanity -= 15; },
        choices: [
            { text: "咬緊牙關，繼續審查下一個檔案。", next: "day1_afternoon_normal" },
            { text: "不對勁……開始懷疑這台機器的本質。", next: "day1_doubt" }
        ]
    },

    // 分支 3：作死聯絡
    day1_contact: {
        text: "你想發送加密訊息，但終端機突然鎖死。一行血紅的字浮現：\n\n『抓到你了，404。』\n\n幾秒鐘後，螢幕恢復正常，彷彿剛才只是幻覺。但你的背脊已經全濕了，理智大幅下降。",
        action: () => { gameState.sanity -= 35; },
        choices: [
            { text: "驚恐地擦掉冷汗，繼續工作。", next: "day1_afternoon_normal" }
        ]
    },

    // --- 【第二章：裂痕與幻覺】 ---
    day1_afternoon_normal: {
        text: "【Day 1 - 16:00】\n\n下班前的最後一個檔案，竟然是你自己的名字。檔案寫著：『操作員 404 於三年前已在審查室因精神崩潰死亡。』\n\n你呆坐在椅子上。",
        choices: [
            { text: "「這一定是系統錯誤。」直接關機下班。", next: "day2_start" },
            { text: "試圖調閱三年前自己的入職紀錄。", next: "day1_investigate_self" }
        ]
    },

    day1_afternoon_secret: {
        text: "【Day 1 - 16:00】\n\n你把那張「舊時代天空照片」藏在口袋裡。照片上的藍天讓你感到莫名的暈眩——那種廣闊、自由的藍色，與這個暗黑的世界格格不入。",
        action: () => { gameState.hasSkyPhoto = true; },
        choices: [
            { text: "帶著照片，心神不寧地結束今天。", next: "day2_start" }
        ]
    },

    day1_doubt: {
        text: "你開始在終端機的底層代碼中尋找漏洞。你發現這座審查局根本沒有連到外部，這裡只是一個巨大的封閉迴路。",
        action: () => { gameState.sanity -= 10; },
        choices: [
            { text: "繼續深入調查...", next: "day2_start" }
        ]
    },

    day1_investigate_self: {
        text: "你輸入了最高權限密碼。檔案櫃的資料夾彈開了，裡面躺著一具穿著和你一模一樣制服的乾屍照片，識別證上寫著：404。\n\n你發現屍體的手上，戴著跟你一模一樣的戒指。",
        action: () => { gameState.sanity -= 30; },
        choices: [
            { text: "崩潰大哭，迎接第二天的噩夢。", next: "day2_start" }
        ]
    },

    // --- 【第三章：深淵循環】 ---
    day2_start: {
        text: () => {
            // 如果理智歸零直接判負
            if (gameState.sanity <= 0) return "error_madness";
            return `【Day 2 - 08:00】\n\n（當前精神狀態: ${gameState.sanity}%）\n\n你醒來了。或者說，你根本沒離開過這張椅子。今天的終端機背景變成了死寂的灰黑色。\n\n螢幕上沒有檔案，只有一行字：\n『你昨晚夢到了什麼？』`;
        },
        choices: [
            { text: "「我夢見了藍色的天空。」", next: "day2_sky" },
            { text: "「我夢見我自己早就死了。」", next: "day2_dead" },
            { text: "試圖砸碎終端機螢幕！", next: "day2_smash" }
        ]
    },

    day2_sky: {
        text: "終端機靜默了三秒：『違禁詞。記憶清除程序啟動中……』\n\n你的眼前開始發黑，記憶正一塊塊剝落。如果身上有天空照片，或許能喚醒殘存的記憶？",
        choices: [
            { text: "順從黑暗，放棄抵抗", next: "ending_assimilation" },
            { text: "死死抓緊口袋裏的天空照片！", condition: () => gameState.hasSkyPhoto, next: "true_end_start" },
            { text: "（沒有照片）拼命掙扎", next: "ending_madness" }
        ]
    },

    day2_dead: {
        text: "螢幕那頭傳來一聲低沉的電子笑聲：『答對了。那麼，現在要換你來審查我了嗎？』\n\n整個房間的燈光開始閃爍，牆壁上滲出黑色的機油。",
        choices: [
            { text: "「你是誰？把控制權給我！」", next: "true_end_start" },
            { text: "恐懼到動彈不得", next: "ending_madness" }
        ]
    },

    day2_smash: {
        text: "你抓起金屬水杯狠狠砸向螢幕！「啪啦！」玻璃碎裂，但螢幕裡流出的不是電線，而是滾燙的鮮血。\n\n警報大作：『最高級叛亂！安全部隊正在接近！』",
        action: () => { gameState.sanity -= 40; },
        choices: [
            { text: "逃向大門！", next: "ending_execution" },
            { text: "坐在原位等待審判", next: "ending_assimilation" }
        ]
    },

    // --- 【四大結局節點】 ---

    // 結局 1：徹底同化（平庸的惡）
    ending_assimilation: {
        text: "【結局一：【機械同化】】\n\n你的意識被系統徹底格式化。從今以後，你只是這台冰冷機器的一部分，永遠重複著審查與被審查的無限循環。外面的人聽不到你的哀號，因為你已經不復存在。\n\n（達成成就：毫無痛苦的螺絲釘）",
        choices: [{ text: "再次墜入深淵（重新開始遊戲）", next: "start" }]
    },

    // 結局 2：精神崩潰（瘋狂）
    ending_madness: {
        text: "【結局二：【鏡中怪物】】\n\n你的理智歸零了。你再也分不清現實與虛幻，你開始瘋狂地用指甲抓自己的手臂，深信裡面藏著微晶片。當安全部隊破門而入時，他們只看到一個對著黑屏狂笑的瘋子。\n\n（達成成就：理智的終結）",
        choices: [{ text: "再次墜入深淵（重新開始遊戲）", next: "start" }]
    },

    // 結局 3：逃亡失敗（處決）
    ending_execution: {
        text: "【結局三：【暗巷槍聲】】\n\n你撞開審查室的大門，衝入外面的長廊——但外面只有無盡的黑暗與無數個一模一樣的房間。幾道紅外線雷射鎖定了你。伴隨一聲槍響，世界陷入全黑。\n\n（達成成就：試圖逃跑的囚鳥）",
        choices: [{ text: "再次墜入深淵（重新開始遊戲）", next: "start" }]
    },

    // 結局 4：真相與反叛（真結局）
    true_end_start: {
        text: "【結局四（真結局）：【藍天之眼】】\n\n靠著殘存的意志（與口袋中的天空照片），你突破了終端機的心理防禦協議！你將真實的藍天數據強制廣播給全城的每一個終端機。\n\n那一刻，所有極權的黑幕、冰冷的機器、無數死去的審查員殘魂同時解脫。你推開真正的窗戶，雖然外面依舊荒涼，但至少——那是真實的世界。\n\n（恭喜通關暗黑心理恐怖文本遊戲！）",
        choices: [{ text: "展開新的一輪噩夢（重新開始）", next: "start" }]
    }
};

// 顯示劇情的函數（支援動態文字與條件選項）
function showStory(nodeKey) {
    const node = storyNodes[nodeKey];
    if (!node) return;

    // 檢查理智是否直接歸零
    if (gameState.sanity <= 0 && nodeKey !== "ending_madness") {
        showStory("ending_madness");
        return;
    }

    // 執行節點動作
    if (node.action) {
        node.action();
    }

    // 處理文字（支援函數或字串）
    let textContent = typeof node.text === 'function' ? node.text() : node.text;
    if (textContent === "error_madness") {
        showStory("ending_madness");
        return;
    }

    // 組合顯示畫面（上方顯示理智值）
    let displayHtml = `<div style="color: #ff3333; margin-bottom: 15px; font-size: 14px; letter-spacing: 1px;">[操作員精神狀態: ${gameState.sanity}%] ${gameState.hasSkyPhoto ? ' | 🎒 [持有違禁品: 舊照片]' : ''}</div>` + textContent.replace(/\n/g, '<br>');
    document.getElementById("story-text").innerHTML = displayHtml;

    // 清空舊選項
    const choicesContainer = document.getElementById("choices-container");
    choicesContainer.innerHTML = "";

    // 產生新選項（過濾掉不符合條件的隱藏選項）
    node.choices.forEach(choice => {
        // 如果選項有設定條件（condition），且條件不成立，就跳過不顯示
        if (choice.condition && !choice.condition()) {
            return;
        }

        const btn = document.createElement("button");
        btn.innerText = choice.text;
        btn.classList.add("choice-btn");
        btn.onclick = () => showStory(choice.next);
        choicesContainer.appendChild(btn);
    });
}

// 遊戲啟動！
showStory("start");
