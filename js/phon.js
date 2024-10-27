const loadPhon =async (searchText,isShowAll) => {
    const res =await fetch (`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    
    displayPhones(phones,isShowAll)

}

const displayPhones = (phones,isShowAll) =>{
     //step 1
    const phonContainer =document.getElementById('phon-container');
    //clear phon container cards before adding new cards
    phonContainer.textContent ='';
    //display show all button if there are more than 12 phones
    const showAllContainer =document.getElementById('show-all-container')
    if(phones.length>12 && !isShowAll){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }

  //console.log('is show all',isShowAll)
   
    //display only first 12 phones if not show all
   if(!isShowAll){
    phones = phones.slice(0,12)
   }
   
    phones.forEach(phone =>{
       // console.log(phone)
        //step 2
        const phonCard =document.createElement('div');
        phonCard.classList =`card bg-gray-100 p-4 shadow-xl`;
        //step 3 set inner html
        phonCard.innerHTML = `
          <figure>
            <img
            src="${phone.image}"
            alt="Shoes" />
        </figure>
        <div class="card-body ">
            <h2 class="card-title text-center font-bold text-3xl">${phone.phone_name
            }</h2>
            <p class="text-center">There are many variations of passages of available, but the majority have suffered</p>
            <h2 class="text-center font-semibold text-3xl">$999</h2>
            <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>

        `
        //step 4
        phonContainer.appendChild(phonCard)
    });
    //hide spinner
    toggleLoadingSpinner(false)
}

//loadPhon()

const handleSearch = (isShowAll) =>{
    const searchField =document.getElementById('search-field');
    const searchText = searchField.value;
    //console.log(searchText)
    loadPhon(searchText,isShowAll);
    toggleLoadingSpinner(true)
}

//const handleSearchTwo =() =>{
   // const searchFieldTwo = document.getElementById('search-field-two');
  //  const searchTextTwo =searchFieldTwo.value;
  //  loadPhon(searchTextTwo)
  //  toggleLoadingSpinner(true)
//}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner =document.getElementById('loading-spinner')
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

//show all
const handleShowAll = () =>{
  handleSearch(true)
}


const handleShowDetail =async (id) => {
    //console.log('click',id)
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
  const phone =data.data;
    showPhoneDetails(phone)
   
}

const showPhoneDetails =(phone) =>{
    console.log(phone)
    const phoneName =document.getElementById('phone-name')
    phoneName.innerText =phone.name
    const showDetailContainer =document.getElementById('show-detail-container')
    showDetailContainer.innerHTML =`
      <img class="mt-2 mb-4" src="${phone.image}" alt="">
      <p><span class="text-lg font-medium my-2">Storage</span>: ${phone.mainFeatures.storage}</p>
      <p><span class="text-lg font-medium my-2">DisplaySize</span>: ${phone.mainFeatures.displaySize}</p>
      <p> <span class="text-lg font-medium my-2">ChipSet</span>: ${phone.mainFeatures.chipSet}</p>
      <p> <span class="text-lg font-medium my-2">Memory</span>: ${phone.mainFeatures.memory}</p>
      <p> <span class="text-lg font-medium my-2">Slug</span>: ${phone.slug}</p>
      <p> <span class="text-lg font-medium my-2">Release Date</span>: ${phone.releaseDate}</p>
      <p> <span class="text-lg font-medium my-2">GPS</span>: ${phone.others.GPS}</p>

    `

    //show the modal
    show_details_modal.showModal()
}