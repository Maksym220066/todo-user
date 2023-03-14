<template>
    <v-card>
        <v-card-title>
            Filter
        </v-card-title>
        <v-card-text>
            <v-row class="my-0">
                <v-col cols="6">
                    <v-select
                        v-model="filter.sortStatus"
                        :items="itemsStatus"
                        item-text="label"
                        hide-details
                        item-value="label"
                        return-object
                        label="Filter by status"
                        outlined
                        dense
                    ></v-select>
                </v-col>
                <v-col cols="6">
                    <v-autocomplete
                        hide-details
                        v-model="filter.sortId"
                        :items="itemsId"
                        item-text="label"
                        item-value="value"
                        return-object
                        label="Filter by userId"
                        outlined
                        dense
                    ></v-autocomplete>
                </v-col>
            </v-row>
            <v-row class="my-0">
                <v-col>
                    <v-text-field
                        v-model="filter.searchQuery"
                        :items="itemsId"
                        hide-details
                        label="Search by title"
                        outlined
                        dense
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
const defaultUserid = {label: 'All users', value: 0};
const defaultStatusSort = {label: 'All', item: 'all', value: true,};
export default {
    name: 'FilterList',
    props: {
        todos: {
            type: Array,
            require: true,
        },
        getFilter: {
            type: Object,
            default: () => {
            }
        }
    },
    data() {
        return {
            itemsId: [defaultUserid],
            itemsStatus: [
                defaultStatusSort,
                {label: 'Completed', item: 'completed', value: true,},
                {label: 'Uncompleted', item: 'completed', value: false,},
                {label: 'Favorites', item: 'favorites', value: true,}
            ],
            filter: {
                sortStatus: defaultStatusSort,
                sortId: defaultUserid,
                searchQuery: '',
            }
        };
    },

    watch: {
        filter: {
            handler(val) {
                this.$emit('update:getFilter', val);
            },
            immediate: true,
        },
        todos(val) {
            if (val?.length) {
                // removing duplicate userId
                const filterUserId = val.filter((el, ind, arr) => arr.findIndex((obj) => obj.userId === el.userId) === ind).map(e => ({
                    label: e.userId,
                    value: e.userId
                }));

                this.itemsId = [defaultUserid, ...filterUserId];
            }
        }
    }
};
</script>

<style scoped>

</style>