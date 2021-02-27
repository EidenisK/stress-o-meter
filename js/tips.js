function displayRandomTip() {
    let texts = [
        {
            title: "Put Some Pep in Your Step",
            text: "Scientists say walking tall with swinging arms helps you feel more positive. Even if you're not feeling happy, a spirited stroll can help you fake it till you make it."
        },
        {
            title: "Slap on a Smile",
            text: "Want to lift your spirits? Lift the corners of your mouth. When you smile like you mean it, you can change your brain's chemistry and feel happier."
        },
        {
            title: "Volunteer",
            text: "Find ways to get involved in your community or help out a friend in need. You'll help yourself, too. It can improve your mental health and well-being. Win-win."
        },
        {
            title: "Make New Friends",
            text: "It makes you feel good to spend time with people who care about you. So be open to new relationships, whether it's someone you meet at the office, gym, church, or park. But be sure to maintain those lifelong connections, too. Studies show the more connected you are, the happier you are."
        },
        {
            title: "Count Your Blessings",
            text: "Write down everything that's good in your life. When you make an effort to look on the bright side, it helps you stay focused on the positive."
        },
        {
            title: "Break a Sweat",
            text: "It can take as little as 5 minutes for exercise to put you in a better mood. Moving your body also has good long-term effects: Regular exercise helps keep depression at bay."
        },
        {
            title: "Forgive and Forget",
            text: "Are you holding a grudge? Let it go. Forgiveness frees you from negative thoughts and makes more room in your life for inner peace. And that brings you happiness."
        },
        {
            title: "Practice Mindfulness",
            text: "Meditate for an hour a week. It'll give you a dose of joy, peace, and contentment. It'll also create new pathways in your brain to make it easier for you to feel joy."
        },
        {
            title: "Turn on Some Tunes",
            text: "Music can have a powerful effect on your emotions. Pick your favorite music mix and get into the groove. You'll get a real feel-good vibe."
        },
        {
            title: "Get the ZZZs You Need",
            text: "Most adults need 7 or 8 hours of sleep each night to stay in a good mood. You're more likely to be happy when you get enough shut-eye."
        },
        {
            title: "Remember Your 'Why'",
            text: "When you have a sense of purpose -- why you work, exercise, or do something good for someone else -- it gives your life meaning. In the hurry of a busy day, it's easy to lose sight of that. So take a moment to bring it to mind. Happiness is about more than momentary pleasure. It's also in the satisfaction of pursuing your goals."
        },
        {
            title: "Challenge Your Inner Critic",
            text: "You know that inner voice that loves to point out everything that isn't so great? Try to notice when it takes control of your mood. Sometimes it has a good point and is letting you know about something that needs your attention. But other times, it's wrong, or it makes things seem worse than they are. Ask yourself, 'Is this true?'"
        },
        {
            title: "Tackle Your Goals",
            text: "Ask yourself if they are realistic and within your reach now -- or at least, things that you can start to work toward. Then get really specific about what the goal is -- not 'to work out more' but 'to walk 30 minutes a day, three times this week,' or 'I'll have a salad for lunch twice this week.' Write it down, and reward yourself for every step you take toward that goal!"
        },
        {
            title: "Seek Positive People",
            text: "'Emotions are contagious,' as the saying goes. So you want people in your life who are confident, upbeat, and healthy. You'll probably find that it rubs off on you, leaving you feeling better. And then you can pass that on, too."
        },
        {
            title: "Ask a Pro",
            text: "If you feel a lot less happy than you used to, even after you try the tips in this slideshow, it's time to call an expert. Book a session with a counselor to talk about how you feel. If depression is the reason you're down, there are treatments. Even if you're not depressed, you might learn some helpful things about yourself and your challenges -- and end up feeling better than you thought you could."
        }
    ];
    let tip = texts[Math.random()*texts.length];

    document.findElementById("tipTitle").innerHtml = tip.title;
    document.findElementById("tipText").innerHtml = tip.text;
}