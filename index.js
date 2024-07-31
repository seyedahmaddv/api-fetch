// Function to display users in the user interface
function displayusers(users) {
    const container = document.getElementById('usersContainer');
    container.innerHTML = ''; // Clear previous content
  
    users.forEach(user => {
        //برای هر کاربر در آرایه، یک کارت جدید ایجاد می‌کند که شامل اطلاعات کاربر (عکس، نام، ایمیل و شناسه) است.
        //این کارت‌ها را به یک ظرف اضافه می‌کند تا در صفحه نمایش داده شوند.
        //در خط پایین یک المان اچ تی ام ال ایجاد میکند سپس به آن دو کلاس اضافه میکند
      const card = document.createElement('div');
      card.classList.add('card', 'mb-3');
        //در خط پایین بازهم یک متغیر ایجاد میکند و به آن المان دیو میدهد 
        //سپس یک کلاس به نام کارت بادی به آن اضافه میکند
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
        //یک متغیر به نام آواتار ایجاد میکند سپس المان آی ام جی را به آن نسبت میدهد
        // تا در سند اچ تی ام ال اضافه شود سپس به این المان یک کلاس اضافه میکند
        //منبع این تگ یا المان تصویر را  در خط سوم پایین تنظیم میکند
      const avatar = document.createElement('img');
      avatar.classList.add('avatar');
      avatar.src = user.avatar;
        //یک متغیر به نام آیدی ایجاد میکند که یک المان به نام پی در صفحه اضافه کند
        //سپس دستور میدهد یک کلاس با نام کارت-متن به آن اضافه شود
        //سپس میگوید محتوای متنی آیدی چه باشد
      const id = document.createElement('p');
      id.classList.add('card-text');
      id.textContent = `ID: ${user.id}`;
        // یک متغیر ایجاد میکند
      const name = document.createElement('h5');
      name.classList.add('card-title');
      name.textContent = `Name: ${user.first_name} ${user.last_name}`;
  
      const email = document.createElement('p');
      email.classList.add('card-text');
      email.textContent = `Email: ${user.email}`;
  
      cardBody.appendChild(avatar);
      cardBody.appendChild(id);
      cardBody.appendChild(name);
      cardBody.appendChild(email);
      card.appendChild(cardBody);
      container.appendChild(card);
    });
  }
  
  // Function to show the loading indicator

  function showloading() {
    //المان اچ تی ام الی با شناسه داخل پرانتز انتهایی را پیدا میکند
    //تا کلاس در خط دوم که در داخل پرانتز نوشته شده است را حذف کند
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.classList.remove('d-none');
  }
  
  // Function to hide the loading indicator
  //این هم تابعی برای مخفی سازی انیمیشن بارگذاری است
  //مخفی کردن انیمیشن بارگذاری برای زمانی است که بارگذاری داده ها کامل شده
  function hideloding() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.classList.add('d-none');
  }
  
  // Function to perform the Fetch request and display users
  // تابعی برای اجرای درخواست واکشی و نمایش کاربران
  // ابتدا بررسی میکند که ایا داده های کاربران در حافظه محلی ذخیره شده است یا خیر
  // اگر داده ها در حافظه محلی موجود باشد و زمان زیادی از ذخیره آن ها نگذشته 
  // که در اینجا سی ثانیه ثبت شده است، این داده ها را از حافظه محلی میخواند و نمایش میدهد
  
  function readusers() {
    const cacheKey = 'users_cache';
    const cacheExpiration = 30000; // 30 seconds
  
    // Check if data is cached and within lifespan
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      const currentTime = Date.now();
      if (currentTime - timestamp < cacheExpiration) {
        displayusers(data);
        hideloding();
        return;
      }
    }
  
    // Show loading indicator
    showloading();
  
    //اجرای درخواست واکشی
    // Perform Fetch request
    fetch('https://reqres.in/api/users?delay=3')
      .then(response => response.json())
      .then(data => {
        displayusers(data.data);
  
        // Store data in cache
        const cacheData = {
          data: data.data,
          timestamp: Date.now()
        };
        localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  
        hideloding();
      })
      .catch(error => {
        console.error('Error:', error);
        hideloding();
      });
  }
  //یک متغیر ساخته میشود و به المان با آیدی مشخصی نسبت داده میشود
  //تا زمانی که کاربر روی دکمه ای با شناسه فرضی کلیک کرد
  //تابع خواندن کاربران فراخوانده شود
  // Attach readusers function to fetch button click event
  const fetchButton = document.getElementById('fetchButton');
  fetchButton.addEventListener('click', readusers);
  /*
  توضیح کلی عملکرد کد:
این کد یک برنامه ساده جاوا اسکریپت است که اطلاعات کاربران را 
از یک ای پی آی خارجی دریافت کرده و در یک صفحه وب نمایش می‌دهد. 
از حافظه محلی برای ذخیره موقت داده‌ها استفاده می‌کند تا در صورت نیاز 
به سرعت آن‌ها را بازیابی کند. همچنین از یک نشانگر بارگذاری استفاده می‌کند 
تا به کاربر نشان دهد که داده‌ها در حال بارگذاری هستند
  */