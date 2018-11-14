// Listen for a submit event
document.querySelector('#zipForm').addEventListener('submit', getLocationInfo);

// listen for delete
document.querySelector('body').addEventListener('click', deleteLocation);

function getLocationInfo(e) {
    // get the input value
    const zip = document.querySelector('.zip').value;

    // Make req
    fetch(`https://api.zippopotam.us/us/${zip}`)
    .then(response => {
        if (response.status != 200){
            showIcon('remove');
            document.querySelector('#output').innerHTML = 
            `
            <article class="message is-danger"><div class="message-body">Invalid Zipcode, please try again.</div></article>
            `;
            throw Error(response.statusText);
        } else {
            showIcon('check');
            return response.json();
        }
    })
    .then(data => {
        // show location info
        let output = '';
        data.places.forEach(place => {
            output += 
            `
            <article class="message is-primary">
                <div class="message-header">
                    <p>Location Info</p>
                    <button class="delete"></button>
                </div>
                <div class="message-body">
                    <ul>
                        <li>City: ${place['place name']}</li>
                        <li>State: ${place['state']}</li>
                        <li>Longitude: ${place['longitude']}</li>
                        <li>Latitude: ${place['latitude']}</li>
                    </ul>
                </div>
            </article>
            `;
        })

        // insert into output div
        document.querySelector('#output').innerHTML = output;
    })
    .catch(err => console.log(err));

    e.preventDefault();
}

function showIcon(icon) {
    // Clear any displayed icons
    document.querySelector('.icon-remove').style.display = 'none';
    document.querySelector('.icon-check').style.display = 'none';

    // show correct icon
    document.querySelector(`.icon-${icon}`).style.display = 'inline-flex';
}

// delete location box
function deleteLocation(e) {
    if(e.target.className == 'delete') {
        document.querySelector('.message').remove();
        document.querySelector('.zip').value = '';
        document.querySelector('.icon-check').style.display = 'none';
    }
}