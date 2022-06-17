import { html } from "lit";

const Rules =[
  {
    text:(obj, isNot, notNot) =>{return `${isNot ? 'Not' : notNot ? 'Not Not':''} ${obj.txt}`},
    rule: (obj, activeCard)=>{
      return obj.txt === activeCard.txt
    },
    cardRender: (obj) =>{return imgCard(obj)},

  },
  {
    text:(obj, isNot, notNot) =>{return `${isNot ? 'Not' : notNot ? 'Not Not':''} ${obj.preferredName || obj.firstName}`},
    rule: (obj, activeCard)=>{
      return (obj.preferredName || obj.firstName) === (activeCard.preferredName || activeCard.firstName)
    },
    cardRender: (obj) =>{return imgCard(obj)},
  },
  {
    text:(obj, isNot, notNot) =>{return imgPrompt(obj, isNot, notNot)},
    rule: (obj, activeCard)=>{
      return (obj.preferredName || obj.firstName) === (activeCard.preferredName || activeCard.firstName)
    },
    cardRender: (obj) =>{return txtCard(obj)},
  },
  {
    text:(obj, isNot, notNot) =>{return `${isNot ? 'Not' : notNot ? 'Not Not':''} last name of ${obj.lastName}`},
    rule: (obj, activeCard)=>{
      return obj.lastName === activeCard.lastName
    },
    cardRender: (obj) =>{return imgCard(obj)},
  },
  {
    text:(obj, isNot, notNot) =>{return `${isNot ? 'Not' : notNot ? 'Not Not':''} ${obj.division}`},
    rule: (obj, activeCard)=>{
      return obj.division === activeCard.division
    },
    cardRender: (obj) =>{return imgCard(obj)},
  },
  {
    text:(obj, isNot, notNot) =>{return `${isNot ? 'Not' : notNot ? 'Not Not':''} ${obj.jobTitle}`},
    rule: (obj, activeCard)=>{
      return obj.jobTitle === activeCard.jobTitle
    },
    cardRender: (obj) =>{return imgCard(obj)},
  },

  {
    text:(obj, isNot) =>{return `${isNot ? 'Not first' : 'First'} (alphabetically by LAST name)`},
    rule: (obj, activeCard, activeCards)=>{
      let lastNames = activeCards.map((card)=>{return card.lastName });
      lastNames.sort();
      return obj.lastName === lastNames[0];

    },
    cardRender: (obj) =>{return imgCard(obj)},
  },
  {
    text:(obj, isNot) =>{return `${isNot ? 'Not first' : 'First'} (alphabetically by FIRST name)`},
    rule: (obj, activeCard, activeCards)=>{
      let firstNames = activeCards.map((card)=>{return card.firstName });
      firstNames.sort();
      return obj.firstName === firstNames[0];

    },
    cardRender: (obj) =>{return imgCard(obj)},
  },
  {
    text:(obj, isNot) =>{return `${isNot ? 'Not last' : 'Last'} (alphabetically by FIRST name)`},
    rule: (obj, activeCard, activeCards)=>{
      let firstNames = activeCards.map((card)=>{return card.txt });
      firstNames.sort();
      console.log(firstNames[firstNames.length-1]);
      return obj.txt === firstNames[firstNames.length-1];

    },
    cardRender: (obj) =>{return imgCard(obj)},
  },
  {
    text:(obj, isNot) =>{return `${isNot ? 'Not last' : 'Last'} (alphabetically by LAST name)`},
    rule: (obj, activeCard, activeCards)=>{
      let lastNames = activeCards.map((card)=>{return card.lastName });
      lastNames.sort();
      return obj.lastName === lastNames[lastNames.length -1];

    },
    cardRender: (obj) =>{return imgCard(obj)},
  },

];

const imgPrompt = (obj, isNot, notNot) =>{
  return (html `
    <div class="card">
      ${isNot ? 'Not' : notNot ? 'Not Not':''}
      <img src=${ obj.photoUrl } alt=${obj.displayName}/>
    </div>
    `
  )
};

const imgCard = (card) =>{
  return (
    html`<img src=${card.photoUrl} alt=${card.displayName}/>`
  )
};

const txtCard = (card) =>{
  return html`<button>${card.txt}</button>`
};

const aTeamRule = {
  text:(obj, isNot, notNot) =>{return `${isNot ? 'Not' : notNot ? 'Not Not':''} ${obj.txt}`},
  rule: (obj, activeCard)=>{
    return obj.txt === activeCard.txt
  },
  cardRender: (obj) =>{return imgCard(obj)},
  activeCards: (possibleCards) => {return possibleCards.filter( (card) =>{
    return card.lastName ==='Barrow';
  })}
};

const johnRule = {
  text:(obj, isNot, notNot) =>{return `${isNot ? 'Not' : notNot ? 'Not Not':''} ${obj.firstName}`},
  rule: (obj, activeCard)=>{
    return obj.firstName === activeCard.firstName
  },
  cardRender: (obj) =>{return imgCard(obj)},
  activeCards: (possibleCards) => {return possibleCards.filter( (card) =>{
    return card.firstName ==='Jonathan' || card.firstName === 'John';

  })}
};

export {Rules, aTeamRule, johnRule}
