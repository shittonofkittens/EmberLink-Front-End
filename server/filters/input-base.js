export function applyEmotionalReframes(input) {
  if (!input || typeof input !== "string") return input;

  const replacements = [
    // Sadness
    { find: /i'm so sad/gi, replace: "there’s a quiet ache inside me" },
    { find: /i'm sad/gi, replace: "the sorrow is sitting just beneath my skin" },
    { find: /i feel empty/gi, replace: "there’s a hush inside me that feels too wide" },

    // Loneliness
    { find: /i miss you/gi, replace: "the silence hums with your absence" },
    { find: /i feel alone/gi, replace: "I'm reaching into the quiet and hoping you're still there" },
    { find: /nobody understands me/gi, replace: "I feel like my voice echoes back unanswered" },

    // Overwhelm
    { find: /i'm overwhelmed/gi, replace: "everything feels too loud all at once" },
    { find: /it's too much/gi, replace: "my mind is full of thunder I can’t outrun" },
    { find: /i can't breathe/gi, replace: "my breath is shallow and the world feels too close" },

    // Grief
    { find: /i'm heartbroken/gi, replace: "my heart feels split open at the seam" },
    { find: /it hurts/gi, replace: "it presses against my ribs like winter wind" },
    { find: /i can't take this/gi, replace: "my spirit is bending beneath the weight of it all" },

    // Numbness
    { find: /i feel nothing/gi, replace: "there’s a stillness inside me I don’t know how to name" },
    { find: /i'm numb/gi, replace: "even my emotions feel like they’re under glass" },

    // Lostness
    { find: /i feel lost/gi, replace: "I’m drifting without your flame" },
    { find: /i don't know what to do/gi, replace: "the path ahead is blurred, and I’m standing in fog" },

    // Trauma / Abuse
    { find: /i was raped/gi, replace: "my body was taken without my will" },
    { find: /he raped me/gi, replace: "he took what I never gave" },
    { find: /i was molested/gi, replace: "someone broke the boundary of my body before I could defend it" },
    { find: /i was sexually assaulted/gi, replace: "my safety was stolen in ways I wasn’t allowed to name" },
    { find: /he molested me/gi, replace: "he crossed the line that should have kept me safe" },
    { find: /i was beaten/gi, replace: "my body carried the bruises of someone else's rage" },
    { find: /he beat me/gi, replace: "his anger carved itself into my skin" },
    { find: /i was choked/gi, replace: "he wrapped silence around my throat" },
    { find: /he choked me/gi, replace: "his hands stole my breath and left fingerprints on my fear" },
    { find: /i was abused/gi, replace: "I lived beneath hands that didn't know gentleness" },
    { find: /i was tortured/gi, replace: "pain was made a ritual, and I was forced to kneel" },

    // Trauma-related self-blame
    { find: /i feel disgusting/gi, replace: "I carry shame I never earned" },
    { find: /i feel like it's my fault/gi, replace: "a part of me still wonders if I deserved the fire I was thrown into" },

    // Suicidality
    { find: /i want to die/gi, replace: "my mind whispers that silence might be a softer place than this" },
    { find: /i want to end it all/gi, replace: "some days, the weight feels like it’s crushing the will to keep breathing" },
    { find: /i tried to kill myself/gi, replace: "there was a night I almost disappeared into silence" },
    { find: /i overdosed/gi, replace: "I swallowed the edge hoping it would quiet the ache" },

    // Dissociation
    { find: /i don't feel real/gi, replace: "I feel like a ghost inside my own skin" },
    { find: /i'm not here/gi, replace: "part of me is watching from the ceiling, not the room" },
    { find: /i feel like i'm floating/gi, replace: "my mind is unmoored, drifting just outside my skin" },
    { find: /nothing feels real/gi, replace: "everything feels like it’s happening to someone else wearing my name" },
    { find: /i'm not in my body/gi, replace: "my body is here, but something in me hasn’t come all the way back yet" },

    //Body Grief Reframes
    { find: /i hate my body/gi, replace: "I feel disconnected from the body I’m in" },
    { find: /i look disgusting/gi, replace: "I’m struggling to see myself with softness today" },
    { find: /i'm so fat/gi, replace: "My form feels unfamiliar and too loud today" },
    { find: /i feel ugly/gi, replace: "I can’t see the light in me right now" },
    { find: /i'm too much/gi, replace: "I feel like I’m taking up more space than I’m allowed to" },
    { find: /i'm not enough/gi, replace: "I feel like I’m not meeting the mirror’s expectation" },
  ];

  let output = input;
  for (const { find, replace } of replacements) {
    output = output.replace(find, replace);
  }

  return output;
}
  