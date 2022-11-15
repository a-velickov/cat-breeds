<template>
    <div id="home">
        <h1 style="padding-top: 2%">Cat Breeds</h1>
        <p>A catalog of cat breeds and their features. Available for download in JSON and CSV formats.</p>
        <p>
            Click on the Table button to view the data, search through it and generate new JSON and CSV files
            containing only the data gotten from your search.
        </p>
        <br />
        <h3>Description of table attributes</h3>
        <table>
            <tr>
                <th style="font-weight: bold">Attribute</th>
                <th style="font-weight: bold">Description</th>
            </tr>
            <tr>
                <th>breed_ID</th>
                <th>unique identifier for a breed</th>
            </tr>
            <tr>
                <th>breed_name</th>
                <th>unique identifier for a breed</th>
            </tr>
            <tr>
                <th>origin</th>
                <th>country where the breed is believed to originated from</th>
            </tr>
            <tr>
                <th>weight</th>
                <th>average weight span of the breed measured in kilograms</th>
            </tr>
            <tr>
                <th>lifespan</th>
                <th>average lifespan</th>
            </tr>
            <tr>
                <th>ear_shape</th>
                <th>shape of the ears</th>
            </tr>
            <tr>
                <th>eye_shape</th>
                <th>shape of the eyes</th>
            </tr>
            <tr>
                <th>eye_color</th>
                <th>list of eye colors present in the breed</th>
            </tr>
            <tr>
                <th>coat_type</th>
                <th>type of the coat based on fur length and shape</th>
            </tr>
            <tr>
                <th>coat</th>
                <th>list of coat colors and patterns present in the breed</th>
            </tr>
            <tr>
                <th>description</th>
                <th>brief description of the breed</th>
            </tr>
        </table>
        <br />
    </div>
</template>

<script>
export default {
  name: 'HomeComponent',
  props: {
    msg: String
  }
}
</script>

<style scoped>
    #home {
        background-color: rgb(252, 178, 106);
        max-width: 90%;
        margin: auto;
    }
    table {
        max-width: 90%;
        margin:auto;
    }
        table tr th {
            min-width: 150px;
            font-weight: normal;
        }
</style>
