function showRandomAnswer() {
    const inputForm = document.getElementById("inputForm");
    const bookCover = document.getElementById("bookCover");
    const randomAnswer = document.getElementById("randomAnswer");
    const againButton = document.getElementById("againButton");
    const versionSelect = document.getElementById("versionSelect");
  
    inputForm.style.display = "none";
    bookCover.style.display = "none";
    randomAnswer.style.display = "flex";
    againButton.style.display = "block";
  
    const generalAnswers = [
        "Every moment is a fresh beginning.\n每一刻都是嶄新的開始。",
        "Believe you can and you're halfway there.\n相信你能行，你已經成功了一半。",
        "The only way to do great work is to love what you do.\n做出優秀的工作的唯一方法就是熱愛你所做的事。",
        "In the middle of every difficulty lies opportunity.\n在每個困難的中間都隱藏著機遇。",
        "Don't count the days, make the days count.\n不要數日子，讓每一天都有意義。",
        "Success is not the key to happiness. Happiness is the key to success.\n成功不是幸福的關鍵。幸福才是成功的關鍵。",
        "Life is 10% what happens to us and 90% how we react to it.\n生活中10%是發生在我們身上的事，90%是我們如何應對它。",
        "Dream big and dare to fail.\n做大夢，敢於失敗。",
        "You are never too old to set another goal or to dream a new dream.\n你永遠不會太老去定下新目標或夢想新的夢。",
        "The secret of getting ahead is getting started.\n成功的秘訣就是開始行動。",
        "The best time to plant a tree was 20 years ago. The second best time is now.\n種植一棵樹最好的時機是20年前，其次是現在。",
        "Strive not to be a success, but rather to be of value.\n努力成為有價值的人，而不是一個成功的人。",
        "It does not matter how slowly you go as long as you do not stop.\n重要的不是你走得有多慢，而是你不要停下來。",
        "The greatest glory in living lies not in never falling, but in rising every time we fall.\n人生最大的榮耀不在於永不跌倒，而在於每次跌倒後都能重新站起來。",
        "I have not failed. I've just found 10,000 ways that won't work.\n我沒有失敗，我只是找到了一萬種行不通的方法。",
        "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.\n相信自己和你的全部。知道你內心有一種力量比任何障礙都要強大。",
        "The only person you are destined to become is the person you decide to be.\n你唯一注定成為的人，就是你決定成為的人。",
        "Success is walking from failure to failure with no loss of enthusiasm.\n成功是在失敗與失敗之間保持熱情。",
        "You miss 100% of the shots you don't take.\n你沒有嘗試的機會，就永遠不會成功。",
        "What lies behind us and what lies before us are tiny matters compared to what lies within us.\n與我們內在的力量相比，身後與身前的一切都微不足道。",
        "Do not go where the path may lead, go instead where there is no path and leave a trail.\n不要走已有的路，去探索那些還沒有開拓的領域，留下屬於自己的足跡。",
        "Our greatest glory is not in never falling, but in rising every time we fall.\n我們最大的光榮不在於永不跌倒，而在於每次跌倒後的重新站起。",
        "Challenges are what make life interesting and overcoming them is what makes life meaningful.\n挑戰讓生活變得有趣，克服挑戰讓生活變得有意義。",
        "Don't watch the clock; do what it does. Keep going.\n不要只盯著時鐘看，要像時鐘一樣運轉著前進。",
        "You are braver than you believe, stronger than you seem, and smarter than you think.\n你比你想像的更勇敢，更強大，更聰明。",
        "The future belongs to those who believe in the beauty of their dreams.\n未來屬於那些相信自己夢想之美的人。",
        "The only limit to our realization of tomorrow will be our doubts of today.\n我們實現明天的唯一限制，就是我們今天的疑慮。",
        "Success is not how high you climb, but how you make a positive difference in the world.\n成功不在於你爬得多高，而在於你對這個世界帶來的積極影響。",
        "Life is about making an impact, not making an income.\n生活是為了留下影響，而不是賺取收入。",
        "It's not about how much you do, but how much love you put into what you do that counts.\n重要的不是你做了多少，而是你在做的過程中投入了多少愛。",
        "The best revenge is massive success.\n最好的報復就是巨大的成功。",
        "Don't let yesterday take up too much of today.\n不要讓昨天佔據太多的今天。",
        "The only thing standing between you and your goal is the story you keep telling yourself why you can't achieve it.\n站在你和目標之間的唯一障礙，是你不斷告訴自己為什麼不能實現它的故事。",
        "Your time is limited, don't waste it living someone else's life.\n你的時間有限，不要浪費在過別人的生活上。",
        "You don't have to be great to start, but you have to start to be great.\n你不必等到做到了很好才開始，但你必須開始才能做到很好。",
        "In order to succeed, we must first believe that we can.\n要成功，我們必須首先相信我們能夠成功。",
        "Success usually comes to those who are too busy to be looking for it.\n成功通常來到那些忙於做事的人身上，而不是那些一直在尋找成功的人身上。",
        "What you get by achieving your goals is not as important as what you become by achieving your goals.\n通過實現目標而獲得的東西不如通過實現目標而成為的人重要。",
        "The way to get started is to quit talking and begin doing.\n開始的方法就是停止空談，開始行動。",
        "Don't let the fear of losing be greater than the excitement of winning.\n不要讓失敗的恐懼大於成功的激情。",
        "The road to success and the road to failure are almost exactly the same.\n通往成功和通往失敗的道路幾乎是一樣的。",
        "The man who has confidence in himself gains the confidence of others.\n對自己有信心的人贏得了別人的信心。",
        "Opportunities don't happen, you create them.\n機會不會自己出現，是你自己創造機會。",
        "Your attitude, not your aptitude, will determine your altitude.\n你的態度，而不是你的能力，將決定你的高度。",
        "Success is not in what you have, but who you are.\n成功不在於你擁有什麼，而在於你是誰。",
        "The harder you work for something, the greater you'll feel when you achieve it.\n你為某件事努力的越多，當你實現它時，你就會感到越大的成就感。",
        "Believe you deserve it and the universe will serve it.\n相信你應得的，宇宙會為你提供。",
        "Your life does not get better by chance, it gets better by change.\n你的生活不會因為偶然而變得更好，它會因為改變而變得更好。",
        "The way to get started is to quit talking and begin doing.\n開始的方法就是停止空談，開始行動。",
        "Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.\n不要被腦海中的恐懼所驅使，要被心中的夢想所引導。",
        "The biggest risk is not taking any risk. In a world that is changing quickly, the only strategy that is guaranteed to fail is not taking risks.\n最大的風險就是不冒任何風險。在一個變化迅速的世界裡，唯一會失敗的策略就是不冒險。",
        "The biggest mistake you can make is to be afraid of making mistakes.\n最大的錯誤是害怕犯錯。",
        "You are the author of your life story. If you're not happy with how it's going, write a better ending.\n你是你生命故事的作者。如果你不喜歡現在的情況，就寫一個更好的結局。",
        "If you can dream it, you can achieve it.\n如果你能夢想到它，你就能實現它。",
        "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.\n成功不是幸福的關鍵。幸福才是成功的關鍵。如果你熱愛自己正在做的事情，你將會成功。",
        "The secret to getting ahead is getting started.\n取得成功的秘訣就是開始行動。",
        "The only limit to our realization of tomorrow is our doubts of today.\n我們實現明天的唯一限制是今天的懷疑。",
        "You are never too old to set another goal or to dream a new dream.\n你永遠不會太老去定下新目標或夢想新的夢。",
        "Success is not the result of spontaneous combustion. You must set yourself on fire.\n成功不是自然而然發生的結果。你必須點燃自己。",
        "Success is not just about accomplishing your goals, it's about who you become in the process.\n成功不僅僅是實現目標，更是在過程中你變成了什麼樣子。",
        "The best way to predict the future is to create it.\n預測未來最好的方法就是創造未來。",
        "Don't let yesterday take up too much of today.\n不要讓昨天佔據了太多的今天。",
        "Success is not how high you climb, but how you make a positive difference in the world.\n成功不是你爬得多高，而是你在這個世界上帶來了多少積極的改變。",
        "The biggest adventure you can take is to live the life of your dreams.\n你可以踏上的最大冒險就是過著你夢想的生活。",
        "The only way to do great work is to love what you do.\n做出偉大工作的唯一方法就是熱愛自己的工作。",
        "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.\n相信自己和你的全部。知道你內心有一種力量比任何障礙都要強大。",
        "Don't wait for opportunity. Create it.\n不要等待機會，創造機會。",
        "Your time is limited, so don't waste it living someone else's life.\n你的時間有限，不要浪費在過別人的生活上。",
        "The only way to achieve the impossible is to believe it is possible.\n實現不可能的唯一方法就是相信它是可能的。",
        "Success is not just about what you accomplish in your life, it's about what you inspire others to do.\n成功不僅僅是你在生活中取得了什麼成就，更是你激勵了別人去做什麼。",
        "You are never too old to set another goal or to dream a new dream.\n你永遠不會太老去定下新目標或夢想新的夢。",
        "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.\n成功不是幸福的關鍵。幸福才是成功的關鍵。如果你熱愛自己正在做的事情，你將會成功。",
        "The secret to getting ahead is getting started.\n取得成功的秘訣就是開始行動。",
        "The only limit to our realization of tomorrow is our doubts of today.\n我們實現明天的唯一限制是今天的懷疑。",
        "You are never too old to set another goal or to dream a new dream.\n你永遠不會太老去定下新目標或夢想新的夢。",
        "Success is not the result of spontaneous combustion. You must set yourself on fire.\n成功不是自然而然發生的結果。你必須點燃自己。",
        "Success is not just about accomplishing your goals, it's about who you become in the process.\n成功不僅僅是實現目標，更是在過程中你變成了什麼樣子。",
        "The best way to predict the future is to create it.\n預測未來最好的方法就是創造未來。",
        "Don't let yesterday take up too much of today.\n不要讓昨天佔據了太多的今天。",
        "Success is not how high you climb, but how you make a positive difference in the world.\n成功不是你爬得多高，而是你在這個世界上帶來了多少積極的改變。",
        "The biggest adventure you can take is to live the life of your dreams.\n你可以踏上的最大冒險就是過著你夢想的生活。",
        "The only way to do great work is to love what you do.\n做出偉大工作的唯一方法就是熱愛自己的工作。",
        "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.\n相信自己和你的全部。知道你內心有一種力量比任何障礙都要強大。",
        "Don't wait for opportunity. Create it.\n不要等待機會，創造機會。",
        "Your time is limited, so don't waste it living someone else's life.\n你的時間有限，不要浪費在過別人的生活上。",
        "The only way to achieve the impossible is to believe it is possible.\n實現不可能的唯一方法就是相信它是可能的。",
        "Success is not just about what you accomplish in your life, it's about what you inspire others to do.\n成功不僅僅是你在生活中取得了什麼成就，更是你激勵了別人去做什麼。",
        "You are never too old to set another goal or to dream a new dream.\n你永遠不會太老去定下新目標或夢想新的夢。",
        "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.\n成功不是幸福的關鍵。幸福才是成功的關鍵。如果你熱愛自己正在做的事情，你將會成功。",
        "The secret to getting ahead is getting started.\n取得成功的秘訣就是開始行動。",
        "The only limit to our realization of tomorrow is our doubts of today.\n我們實現明天的唯一限制是今天的懷疑。",
        "You are never too old to set another goal or to dream a new dream.\n你永遠不會太老去定下新目標或夢想新的夢。",
        "Success is not the result of spontaneous combustion. You must set yourself on fire.\n成功不是自然而然發生的結果。你必須點燃自己。",
        "Success is not just about accomplishing your goals, it's about who you become in the process.\n成功不僅僅是實現目標，更是在過程中你變成了什麼樣子。",
        "The best way to predict the future is to create it.\n預測未來最好的方法就是創造未來。",
        "Don't let yesterday take up too much of today.\n不要讓昨天佔據了太多的今天。",
        "Success is not how high you climb, but how you make a positive difference in the world.\n成功不是你爬得多高，而是你在這個世界上帶來了多少積極的改變。",
        "The biggest adventure you can take is to live the life of your dreams.\n你可以踏上的最大冒險就是過著你夢想的生活。",
        "The only way to do great work is to love what you do.\n做出偉大工作的唯一方法就是熱愛自己的工作。",
        "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.\n相信自己和你的全部。知道你內心有一種力量比任何障礙都要強大。",
    ];
  
    const loveAnswers = [
      "Love is composed of a single soul inhabiting two bodies.\n愛是由兩個身體共有一個靈魂所組成。",
"You know you're in love when you can't fall asleep because reality is finally better than your dreams.\n當你因為現實比夢境更美好而無法入睡時，你就知道你已經墜入愛河了。",
"To love and be loved is to feel the sun from both sides.\n愛與被愛就像是兩面都能感受到陽光。",
"In all the world, there is no heart for me like yours.\n在這個世界上，沒有一顆心能像你的心一樣對我如此重要。",
"Love is not just looking at each other, it's looking in the same direction.\n愛不僅僅是彼此相望，更是朝著同一個方向看。",
"The best love is the kind that awakens the soul and makes us reach for more, that plants a fire in our hearts and brings peace to our minds.\n最好的愛是那種喚醒靈魂，讓我們渴望更多的愛，點燃我們心中的火焰，帶來內心的平靜。",
"Love is like the wind, you can't see it but you can feel it.\n愛就像風一樣，你看不見它，但你可以感受到它。",
"I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.\n我看到你是完美的，所以我愛你。然後我看到你並不完美，我更加愛你。",
"Love is when the other person's happiness is more important than your own.\n愛就是當對方的幸福比你自己的更重要時。",
"I have found the paradox, that if you love until it hurts, there can be no more hurt, only more love.\n我發現了一個矛盾，如果你愛到痛苦，就不會再有更多的痛苦，只會有更多的愛。",
"Love is an irresistible desire to be irresistibly desired.\n愛是一種無法抗拒的渴望，渴望無法被抗拒。",
"The heart wants what it wants. There's no logic to these things. You meet someone and you fall in love and that's that.\n心有所屬。這些事情沒有邏輯可言。你遇到了某個人，你墜入愛河，就是這樣。",
"I love you not because of who you are, but because of who I am when I am with you.\n我愛你不是因為你是誰，而是因為和你在一起時的自己是怎樣的。",
"Love is a friendship set to music.\n愛是一種用音樂演繹的友誼。",
"Love is the flower you've got to let grow.\n愛就像一朵花，你必須讓它自由生長。",
"You don't love someone for their looks, or their clothes, or for their fancy car, but because they sing a song only you can hear.\n你愛一個人，不是因為他們的外表、衣服或豪車，而是因為他們唱著只有你能聽見的歌。",
"Love is the greatest refreshment in life.\n愛是生活中最偉大的慰藉。",
"The best and most beautiful things in this world cannot be seen or even heard, but must be felt with the heart.\n這個世界上最美好最美麗的事物，不能被看見，甚至不能被聽到，只能用心感受。",
"Love is like war: easy to begin but very hard to stop.\n愛情就像戰爭：開始容易，停止卻很困難。",
"Love is a game that two can play and both win.\n愛情是一場兩人都能參與且兩者都能贏的遊戲。",
"Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.\n被某人深深愛著給了你力量，而深深愛著某人則給了你勇氣。",
"Love is when you look into someone's eyes and see everything you need.\n愛情就是當你看著某人的眼睛，看到了你所需要的一切。",
"Love is a canvas furnished by nature and embroidered by imagination.\n愛情是大自然所提供的畫布，由想像力來繡製。",
"To love is to burn, to be on fire.\n愛就是燃燒，就是熊熊烈火。",
"Love is an act of endless forgiveness, a tender look which becomes a habit.\n愛是無盡的寬恕，是一個溫柔的眼神，這種眼神成了一種習慣。",
"I love you as one loves certain dark things, secretly, between the shadow and the soul.\n我愛你，就像一個人愛某些黑暗的事物，秘密地，位於陰影和靈魂之間。",
"Love is the beauty of the soul.\n愛是靈魂的美麗。",
"We loved with a love that was more than love.\n我們以一種超越愛的愛相愛。",
"Love is not a matter of counting the years, but making the years count.\n愛不是計算年數的問題，而是讓每一年都有意義。",
"To love oneself is the beginning of a lifelong romance.\n愛自己是一生浪漫的開始。",
"Love cures people - both the ones who give it and the ones who receive it.\n愛可以治癒人心，無論是給予愛的人還是接受愛的人。",
"The best love is the one that makes you a better person, without changing you into someone other than yourself.\n最好的愛是讓你成為更好的人，而不是讓你成為別人。",
"Love is when you meet someone who tells you something new about yourself.\n愛是當你遇到一個人，他告訴你一些你自己都不知道的事情。",
"Love is the master key that opens the gates of happiness.\n愛是打開幸福之門的主鑰匙。",
"Love is a game that two can play and both win.\n愛情是一場兩人都能參與且兩者都能贏的遊戲。",
"I would rather spend one lifetime with you, than face all the ages of this world alone.\n我寧願和你度過一生，也不願一個人面對這個世界的所有時代。",
"Love is not only something you feel, it is something you do.\n愛不僅是一種感覺，也是一種行為。",
"Love is the poetry of the senses.\n愛情是感官的詩歌。",
"To love is nothing. To be loved is something. But to love and be loved, that’s everything.\n愛並不是什麼大不了的事情。被愛才是。但愛和被愛，這就是一切。",
"Love is an untamed force. When we try to control it, it destroys us. When we try to imprison it, it enslaves us. When we try to understand it, it leaves us feeling lost and confused.\n愛是一種未被馴服的力量。當我們試圖控制它，它摧毀了我們。當我們試圖囚禁它，它奴役了我們。當我們試圖理解它，它讓我們感到迷失和困惑。",
"The best thing to hold onto in life is each other.\n人生中最好的東西就是彼此相依。",
"Love is not about how much you say 'I love you', but how much you can prove that it's true.\n愛並不是說多少次「我愛你」，而是要證明這句話的真實性。",
"Love is the strongest force the world possesses, yet it is the humblest imaginable.\n愛是世界上最強大的力量，卻是我們所能想像的最謙卑的。",
"Love is like quicksilver in the hand. Leave the fingers open and it stays. Clutch it, and it darts away.\n愛就像手中的水銀。張開手指，它就會停留。緊握住它，它就會迅速消失。",
"The greatest happiness of life is the conviction that we are loved; loved for ourselves, or rather, loved in spite of ourselves.\n人生最大的幸福是確信我們被愛，愛的是我們自己，或者更準確地說，是儘管我們的自己。",
"Love is a canvas furnished by nature and embroidered by imagination.\n愛情是大自然提供的畫布，由想像力來繡製。",
"The heart has its reasons, of which reason knows nothing.\n心有它的理由，而理性卻一無所知。",
"When love is not madness, it is not love.\n當愛不瘋狂時，它就不是愛情。",
"Love is that condition in which the happiness of another person is essential to your own.\n愛是這樣一種狀態：另一個人的幸福對你自己也是至關重要的。",
"Love doesn't make the world go 'round. Love is what makes the ride worthwhile.\n愛並不能讓世界轉動，但是愛讓旅途變得有價值。",
"We loved with a love that was more than love.\n我們以一種超越愛的愛相愛。",
"You are my heart, my life, my one and only thought.\n你是我的心，我的生命，我的唯一想法。",
"To love another person is to see the face of God.\n愛上一個人就是看到上帝的面孔。",
"The greatest thing you'll ever learn is just to love and be loved in return.\n你會學到最重要的事情就是學會愛和被愛。",
"Love is not about possession, it's all about appreciation.\n愛不是佔有，而是欣賞。",
"There is always some madness in love. But there is also always some reason in madness.\n愛情中總有一些瘋狂，但瘋狂中也總有一些理性。",
"To love is to burn, to be on fire.\n愛就是燃燒，就是熊熊烈火。",
"Love is the only force capable of transforming an enemy into a friend.\n愛是唯一能夠將敵人變成朋友的力量。",
"Love is the enchanted dawn of every heart.\n愛是每顆心靈的魔法黎明。",
"Love doesn't need to be perfect, it just needs to be true.\n愛情不需要完美，它只需要真實。",
"Love is the master key that opens the gates of happiness.\n愛情是打開幸福之門的主鑰匙。",
"The heart has its reasons of which reason knows nothing.\n心有它的理由，而理性卻一無所知。",
"I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.\n我看到你是完美的，所以我愛你。然後我看到你並不完美，我更加愛你。",
"Love is not about how much you say 'I love you', but how much you can prove that it's true.\n愛並不是說多少次「我愛你」，而是要證明這句話的真實性。",
"Love is an act of endless forgiveness, a tender look which becomes a habit.\n愛是無盡的寬恕，是一個溫柔的眼神，這種眼神成了一種習慣。",
"The best thing to hold onto in life is each other.\n人生中最好的東西就是彼此相依。",
"Love is a game that two can play and both win.\n愛情是一場兩人都能參與且兩者都能贏的遊戲。",
"Love is the beauty of the soul.\n愛是靈魂的美麗。",
"We loved with a love that was more than love.\n我們以一種超越愛的愛相愛。",
"Love is not a matter of counting the years, but making the years count.\n愛不是計算年數的問題，而是讓每一年都有意義。",
"To love oneself is the beginning of a lifelong romance.\n愛自己是一生浪漫的開始。",
"Love cures people - both the ones who give it and the ones who receive it.\n愛可以治癒人心，無論是給予愛的人還是接受愛的人。",
"Love is when you meet someone who tells you something new about yourself.\n愛是當你遇到一個人，他告訴你一些你自己都不知道的事情。",
"Love is the master key that opens the gates of happiness.\n愛情是打開幸福之門的主鑰匙。",
"Love is not only something you feel, it is something you do.\n愛不僅是一種感覺，也是一種行為。",
"Love is the poetry of the senses.\n愛情是感官的詩歌。",
"To love is nothing. To be loved is something. But to love and be loved, that’s everything.\n愛並不是什麼大不了的事情。被愛才是。但愛和被愛，這就是一切。",
"Love is an untamed force. When we try to control it, it destroys us. When we try to imprison it, it enslaves us. When we try to understand it, it leaves us feeling lost and confused.\n愛是一種未被馴服的力量。當我們試圖控制它，它摧毀了我們。當我們試圖囚禁它，它奴役了我們。當我們試圖理解它，它讓我們感到迷失和困惑。",
"The best thing to hold onto in life is each other.\n人生中最好的東西就是彼此相依。",
"Love is not about possession, it's all about appreciation.\n愛不是佔有，而是欣賞。",
"There is always some madness in love. But there is also always some reason in madness.\n愛情中總有一些瘋狂，但瘋狂中也總有一些理性。",
"To love is to burn, to be on fire.\n愛就是燃燒，就是熊熊烈火。",
"Love is the only force capable of transforming an enemy into a friend.\n愛是唯一能夠將敵人變成朋友的力量。",
"Love is the enchanted dawn of every heart.\n愛是每顆心靈的魔法黎明。",
"Love doesn't need to be perfect, it just needs to be true.\n愛情不需要完美，它只需要真實。",
"There is always some madness in love. But there is also always some reason in madness.\n愛情中總有一些瘋狂，但瘋狂中也總有一些理性。",
"To love is to burn, to be on fire.\n愛就是燃燒，就是熊熊烈火。",
"Love is the only force capable of transforming an enemy into a friend.\n愛是唯一能夠將敵人變成朋友的力量。",
"Love is the enchanted dawn of every heart.\n愛是每顆心靈的魔法黎明。",
"Love doesn't need to be perfect, it just needs to be true.\n愛情不需要完美，它只需要真實。",
"We loved with a love that was more than love.\n我們以一種超越愛的愛相愛。",
"You are my heart, my life, my one and only thought.\n你是我的心，我的生命，我的唯一想法。",
"To love another person is to see the face of God.\n愛上一個人就是看到上帝的面孔。",
"The greatest thing you'll ever learn is just to love and be loved in return.\n你會學到最重要的事情就是學會愛和被愛。",
"Love is not about possession, it's all about appreciation.\n愛不是佔有，而是欣賞。",
"There is always some madness in love. But there is also always some reason in madness.\n愛情中總有一些瘋狂，但瘋狂中也總有一些理性。",
"To love is to burn, to be on fire.\n愛就是燃燒，就是熊熊烈火。",
"Love is the only force capable of transforming an enemy into a friend.\n愛是唯一能夠將敵人變成朋友的力量。",
"Love is the enchanted dawn of every heart.\n愛是每顆心靈的魔法黎明。",
"Love doesn't need to be perfect, it just needs to be true.\n愛情不需要完美，它只需要真實。",
    ];
  
    const combinedAnswers = generalAnswers.concat(loveAnswers);
  
    const version = versionSelect.value;
    let answers = [];
  
    switch (version) {
      case "general":
        answers = generalAnswers;
        break;
      case "love":
        answers = loveAnswers;
        break;
      case "combined":
        answers = combinedAnswers;
        break;
      default:
        answers = generalAnswers;
    }
    
    const randomIndex = Math.floor(Math.random() * answers.length);
    randomAnswer.textContent = answers[randomIndex];
  }
  
  function showInputForm() {
    const inputForm = document.getElementById("inputForm");
    const bookCover = document.getElementById("bookCover");
    const randomAnswer = document.getElementById("randomAnswer");
    const againButton = document.getElementById("againButton");
  
    inputForm.style.display = "block";
    bookCover.style.display = "block";
    randomAnswer.style.display = "none";
    againButton.style.display = "none";
  }
  