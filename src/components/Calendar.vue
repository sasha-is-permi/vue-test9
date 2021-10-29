<template>
   <div>
      <section >
        <div class="container mt-3">   
            <div class="block-shadow">    

            <!-- Вывод заголовка:  месяц и год --> 
            <div class="head-calendar">
               <div class="arrow arrow-left">
                     <p @click="back">&lsaquo;</p>   
                    </div>
                    <h3>{{ header }}</h3>
                    <div class="arrow arrow-right">
                        <p @click="next"> &rsaquo; </p>
                    </div>
                </div>

            <table>
                  
           <!-- Вывод дней недели в заголовке -->       
           <tr class="calendar" >
				<th v-for="d in daysOfWeek" :key="d">{{d}}</th>
			</tr>
                
 
            <!-- Вывод данных в календарь --> 
     <tr v-for="week in calendar()" :key="week">					   
			<!-- Выделяем серым цветом ячейки (класс bg-light bootstrap), чей месяц не текущий 
            Также выделяем цветом сегодняшнее число -->
            <td v-for="day in week" :key="day" :class="{'bg-light':day.status!=='current',
            'today':(day.value===dayCurrent) && (month===monthCurrent) && (year=== yearCurrent) &&(day.status==='current')}"  >

            <!-- Если 1-е число месяца- подписываем начало месяца сверху. Берем только первые 3 символа -->
            <div class="month" v-if="day.value===1"><p>{{day.month}}</p></div>                  
                    {{ day.value }}
            </td>

  	</tr>	
    

            </table>
            </div>           
           
        </div>
    </section>

   </div>
</template>

<script>



//     day:""     просматриваемый день
//     month:"",  просматриваемый месяц
//     monthNumber:0, номер просматреваемого месяца 
//     year:"",   просматриваемый год 

//       dayCurrent:"",  сегодняшний день
//       monthCurrent:"", сегодняшний месяц
//       monthNumberCurrent:0, сегодняшний номер месяца
//       yearCurrent:2021, сегодняшний год


//     Массивы дней недели и месяцев: 
//     daysOfWeek:["mon","tue", "wed", "thu", "fri", "sat", "sun"],
//     months : ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"],

export default {
  data(){
    return{
        

       day:0,
       month:"",
       monthNumber:0,
       year:2021,

       dayCurrent:0,
       monthCurrent:"",
       monthNumberCurrent:0,
       yearCurrent:2021,

       daysOfWeek:["mon","tue", "wed", "thu", "fri", "sat", "sun"],
       months : ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"],

    }
  },
  methods: {

   // Формирование общего календаря на 6 недель (текущий выбранный месяц.
   // Может также включать конец прошлого месяца и начало будущего)

      calendar() { 
          
        // Календарь на текущий выбранный месяц.      
        let daysCurrent =   this.monthCalendar(this.monthNumber,this.year,"current")

        
        // Календарь на прошлый месяц.      
        let monthPreviousNumber =  this.monthNumber-1;
        let yearPrevious =  this.year;
         // Если получается месяц меньше 0- просматривать будем предыдущий год
         if (monthPreviousNumber < 0) {
         monthPreviousNumber = 11; // месяцы в javascript нумеруются с 0-11
         yearPrevious--;
                    }

        let daysPrevious =   this.monthCalendar(monthPreviousNumber,yearPrevious,"previous")

 
        // Календарь на будущий месяц.       
        let monthNextNumber =  this.monthNumber+1;
        let yearNext =  this.year;
         // Если получается месяц > 11- просматривать будем будущий год
         if (monthNextNumber > 11) {
         monthNextNumber = 0; // месяцы в javascript нумеруются с 0-11
         yearNext++;
                    }

        let daysNext =   this.monthCalendar(monthNextNumber,yearNext,"next")


        // Формируем массив дней в календаре  на 6 недель (текущий выбранный месяц.
        // Может также включать конец прошлого месяца и начало будущего) 
        let days = this.calendarCalculator(daysPrevious,daysCurrent,daysNext);    

        return days;
        
			},    

      // Расчет массива дней для конкретного месяца 
      monthCalendar(monthNumber,year,statusMonth){
            
            // Сокращенное наименование месяца
            let monthName = this.getMonthMethod(monthNumber).substr(0,3)

            let days = []; // массив дней в календаре 
			    
			let week = 0;  // номер недели
			days[week] = [];             
            // days[0] - первая неделя, содержит элементы

           // Получение последнего дня в месяце
           // Обычно даты начинаются с 1, но технически возможно передать любое число, и дата сама себя поправит
           // Так что если передать 0, то это значение будет соответствовать «один день перед первым числом месяца», 
           // другими словами: «последнее число прошлого месяца»
           // Поскольку передаем следующий месяц- this.monthNumber + 1 - возращается последний день текущего месяца
			let dlast = new Date(year, monthNumber + 1, 0).getDate();
                 
                // Цикл по дням- с первого дня месяца до последнего 
                for (let i = 1; i <= dlast; i++) {

                   // getDay возвращает целое число, обозначающее день недели: 1 - понедельник             
                    if (new Date(year, monthNumber, i).getDay() != 1) {
                        // Если день недели не понедельник- заносим номер дня в массив для текущей недели days[week]
                        // (получается двумерный массив)
                        // Добавляем число, сокращенное наименование месяца и статус- текущий, прошлый, будущий 
						days[week].push({value:i,month:monthName,status:statusMonth});					
						}
                     else {
                        // Если день недели  понедельник- начинаем новую неделю в двумерном массиве days[week]
                        // (получается двумерный массив)   
                        week++;
                        // создаем новый элемент массива						
                        days[week] = [];
                        //  заносим номер дня в массив                        
                        days[week].push({value:i,month:monthName,status:statusMonth});
						
						}
                    }
                 
                if (days[0].length==0) {days.shift()}
                
                return days;
      },
				  

   
        // Соединяем предыдущий месяц, нынешний и будущий.
        // Должен получиться календарь с 6-ти строками (если не хватает- добавляем)
        calendarCalculator(daysPrevious,daysCurrent,daysNext){
             

              let  monthNamePrevious = daysPrevious[1][0].month;
              let  monthStatusPrevious =  "previous"


              let  monthNameNext = daysNext[1][0].month;
              let  monthStatusNext = "next"

              console.log("daysPrevious",daysPrevious)

              console.log("daysCurrent",daysCurrent)
           
              console.log("daysNext",daysNext)

       		

                    // Если первая неделя месяца (1 число) не начинается с понедельника- можно добавить данные из прошлого месяца   
                    if (daysCurrent[0].length !==7) {
                    // Смотрим- сколько дней в первой неделе. Если скажем 3- добавим 4 дня с днями  
                    // из прошлого месяца. Берем данные из 5-й строчки (4 индекс) прошлого месяца. Ситуацию февраля (3 индекс) исключили выше
                    // (если февраль прошлый- 28 дней- он ровно без остатка будет и новый месяц начнется с 1 числа ) 
                    let previousDay= daysPrevious[4][daysPrevious[4].length-1].value; // последний день прошлого месяца
					for (let i = daysCurrent[0].length; i < 7; i++) {        
                        // добавляем данные в начала массива                
						daysCurrent[0].unshift({value:previousDay,month:monthNamePrevious,status:monthStatusPrevious});		
                        previousDay--;				
					}
                    }
				
                    
                    let nextDay=0; // первый день будущего месяца
                    let nextWeek = 0;


                    // Смотрим- сколько дней на пятой неделе (индекс nextWeek=4 - начинается с 0). Если скажем 3- добавим 4 дня с днями  
                    // из будущего месяца
                    nextWeek=4;
                    if (daysCurrent[nextWeek]== undefined) {daysCurrent[nextWeek]=[]}	  
                    let calcDays = 7 - daysCurrent[nextWeek].length +1;
					for (let i = 1; i< calcDays; i++) {                           
                        nextDay++;         
                        // добавляем данные в конец массива                                         
					    daysCurrent[nextWeek].push({value:nextDay,month:monthNameNext,status:monthStatusNext});		
                    		
					}
                     
                  
                    // Смотрим- сколько дней на шестой неделе (индекс nextWeek=5 - начинается с 0). Если скажем 3- добавим 4 дня с днями  
                    // из будущего месяца
                    nextWeek=5;
                    if (daysCurrent[nextWeek]== undefined) {daysCurrent[nextWeek]=[]}	 
                    calcDays = 7 - daysCurrent[nextWeek].length +1;
					for (let i = 1; i< calcDays; i++) {              
                        nextDay++;    
                        // добавляем данные в конец массива                   
					    daysCurrent[nextWeek].push({value:nextDay,month:monthNameNext,status:monthStatusNext});	                      				
					}
                     



                   
           


                           
               return daysCurrent;

        },

  // Переход на месяц раньше
  back(){
       this.monthNumber--;
       // Если получается месяц меньше 0- просматривать будем предыдущий год
       if (this.monthNumber < 0) {
       this.year--;    
       this.monthNumber = 12; // месяцы в javascript нумеруются с 0-11
       this.monthNumber--;    
                    }
       // Получаем название месяца из его номера            
       this.month = this.getMonthMethod(this.monthNumber)
       console.log("this.monthNumber",this.monthNumber)
       console.log("this.year",this.year)

  },
  // Переход на месяц позже
  next(){
         // Если получается месяц > 11- просматривать будем будущий год
       this.monthNumber++;
           if (this.monthNumber > 11) {
           this.year++;
           this.monthNumber = -1;
           this.monthNumber++;
          
                    }
        // Получаем название месяца из его номера                 
       this.month = this.getMonthMethod(this.monthNumber) 
       console.log("this.monthNumber",this.monthNumber)
       console.log("this.year",this.year)           
  },
 

// Получение из  массива месяцев this.months наименования месяца в виде строки
getMonthMethod(monthNumber){   
   let nameMonth = this.months[monthNumber];
   return  nameMonth
   }

  },
   
   // Вычисляемое свойство для заголовка
   computed:{
      // Выводим название месяца и год в заголовке календаря
   header(){
     return   this.month + " " + this.year
   },  

 
            },

  created(){
    // Используем хук created на этапе создаения приложения- считываем текущую дату
    // Он вызывается до построения DOM-дерева
    let date =  new Date()              // получаем текущую дату

    this.day   = date.getDate()           // используем стандартный метод для получения дня месяца   

    this.monthNumber = date.getMonth()   // номер просматриваемого месяца 0-11 
    this.month = this.getMonthMethod(this.monthNumber)    // используем собственный метод для получение наименования месяца
    this.year  = +date.getFullYear()       // используем стандартный метод для получения года
  
    // Запоминаем сегодняшнюю дату
    this.dayCurrent= this.day;
    this.monthCurrent = this.month;
    this.monthNumberCurrent = this.monthNumber;
    this.yearCurrent = this.year;


  } 
  
}
</script>




<!-- Стили только для этого файла (scoped) -->

<style scoped >

.container{
    min-width: 800px;
}

.today {
    color: red;
}

.block-shadow {
    box-shadow: 0 4px 4px rgba(148, 113, 113, 0.2);
    width: 50%; 
}
table {
    border: 1px solid #eceff2;
    border-top: none;
     width: 100%;
    table-layout: fixed;
    text-align: center;
    padding: 30px;
}
tr, th, td {
    padding: 15px;
}

th {
    padding-top: 0;
    color: #3e3ecf;
    text-transform: uppercase;
    font-weight: 400;
}
td {
    color: grey;
}
.head-calendar {
    border-top: 1px solid #eceff2;
    border-left: 1px solid #eceff2;
    border-right: 1px solid #eceff2;
    padding: 25px;
    justify-content: space-between;
    display: flex;
    padding-bottom: 0;
   width: 100%;
}
.arrow p {
    cursor: pointer;
    color: grey;
    font-size: 30px;
}
.calendar {
    padding-top: 0;
    border-bottom: 1px solid #eceff2;;
}
h3 {
    color:grey;
    font-weight: 400;
}

.month p {
    text-transform: uppercase;
    font-size: 12px;
    margin-bottom: 0;
    margin-top: -10px;
}
.month-new p {
    text-transform: uppercase;
    margin-top: -10px;
    margin-bottom: 0;
    font-size: 12px;
}



</style>

