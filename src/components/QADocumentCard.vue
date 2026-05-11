<template>
    <div class="qa-doc-card" @click="$emit('click')">
        <div class="qa-doc-card-header">
            <span class="qa-doc-card-category">{{ document.category }}</span>
            <span v-if="document.status" :class="['qa-doc-card-status', document.status.toLowerCase()]">
                {{ document.status }}
            </span>
        </div>

        <h3 class="qa-doc-card-title">{{ document.title }}</h3>

        <p class="qa-doc-card-project">{{ document.project }}</p>

        <p class="qa-doc-card-scope">{{ document.scope }}</p>

        <div class="qa-doc-card-footer">
            <div class="qa-doc-card-meta">
                <span class="qa-doc-card-date">{{ formatDate(document.executionDate) }}</span>
                <span class="qa-doc-card-sample-badge">Sample</span>
            </div>
            <div v-if="document.tools" class="qa-doc-card-tools">
                <span v-for="(tool, index) in document.tools.slice(0, 2)" :key="tool" class="qa-doc-card-tool">
                    {{ tool }}
                </span>
                <span v-if="document.tools.length > 2" class="qa-doc-card-tool-more">
                    +{{ document.tools.length - 2 }}
                </span>
            </div>
        </div>

        <div class="qa-doc-card-hover-indicator">
            <ion-icon name="arrow-forward-outline"></ion-icon>
        </div>
    </div>
</template>

<script setup>
defineProps({
    document: {
        type: Object,
        required: true
    }
})

defineEmits(['click'])

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' }
    return new Date(dateString).toLocaleDateString('en-US', options)
}
</script>

<style scoped>
.qa-doc-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    background-color: #ffffff;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
}

.qa-doc-card:hover {
    border-color: #d1d5db;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    background-color: #fafbfc;
}

.qa-doc-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
}

.qa-doc-card-category {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    color: #6366f1;
    background-color: #eef2ff;
    padding: 4px 8px;
    border-radius: 10px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    white-space: nowrap;
}

.qa-doc-card-status {
    display: inline-block;
    font-size: 10px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 10px;
    white-space: nowrap;
}

.qa-doc-card-status.pass {
    background-color: #dcfce7;
    color: #166534;
}

.qa-doc-card-status.resolved {
    background-color: #dbeafe;
    color: #1e40af;
}

.qa-doc-card-status.in\ progress {
    background-color: #fef3c7;
    color: #92400e;
}

.qa-doc-card-title {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #1f2937;
    line-height: 1.4;
}

.qa-doc-card-project {
    margin: 0;
    font-size: 12px;
    font-weight: 500;
    color: #6b7280;
}

.qa-doc-card-scope {
    margin: 0;
    font-size: 12px;
    color: #9ca3af;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.qa-doc-card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding-top: 8px;
    border-top: 1px solid #f3f4f6;
}

.qa-doc-card-meta {
    display: flex;
    gap: 8px;
    align-items: center;
}

.qa-doc-card-date {
    font-size: 11px;
    color: #9ca3af;
    font-weight: 500;
}

.qa-doc-card-sample-badge {
    display: inline-block;
    font-size: 9px;
    font-weight: 700;
    color: #0369a1;
    background-color: #e0f2fe;
    padding: 2px 6px;
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 0.2px;
}

.qa-doc-card-tools {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    justify-content: flex-end;
}

.qa-doc-card-tool {
    display: inline-block;
    font-size: 10px;
    color: #6b7280;
    background-color: #f3f4f6;
    padding: 3px 6px;
    border-radius: 4px;
    border: 1px solid #e5e7eb;
}

.qa-doc-card-tool-more {
    display: inline-block;
    font-size: 10px;
    color: #9ca3af;
    font-weight: 600;
    padding: 3px 6px;
}

.qa-doc-card-hover-indicator {
    position: absolute;
    top: 16px;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background-color: rgba(31, 41, 55, 0.05);
    color: #6b7280;
    opacity: 0;
    transition: all 0.2s ease;
    font-size: 14px;
}

.qa-doc-card:hover .qa-doc-card-hover-indicator {
    opacity: 1;
    background-color: rgba(31, 41, 55, 0.1);
    color: #1f2937;
}

@media (max-width: 480px) {
    .qa-doc-card {
        gap: 10px;
        padding: 12px;
    }

    .qa-doc-card-title {
        font-size: 13px;
    }

    .qa-doc-card-project {
        font-size: 11px;
    }

    .qa-doc-card-scope {
        font-size: 11px;
        -webkit-line-clamp: 1;
    }
}
</style>
